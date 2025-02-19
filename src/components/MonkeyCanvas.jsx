import { useEffect, useRef } from 'react'

export const backgroundItems = [
  { 
    name: 'Warm Yellow', 
    src: 'linear-gradient(135deg, #fef3c7, #fcd34d)',
    preview: 'linear-gradient(135deg, #fef3c7, #fcd34d)'
  },
  { 
    name: 'Soft Green', 
    src: 'linear-gradient(135deg, #dcfce7, #86efac)',
    preview: 'linear-gradient(135deg, #dcfce7, #86efac)'
  },
  { 
    name: 'Baby Blue', 
    src: 'linear-gradient(135deg, #dbeafe, #93c5fd)',
    preview: 'linear-gradient(135deg, #dbeafe, #93c5fd)'
  },
  { 
    name: 'Lavender', 
    src: 'linear-gradient(135deg, #ede9fe, #c4b5fd)',
    preview: 'linear-gradient(135deg, #ede9fe, #c4b5fd)'
  },
  { 
    name: 'Rose', 
    src: 'linear-gradient(135deg, #ffe4e6, #fda4af)',
    preview: 'linear-gradient(135deg, #ffe4e6, #fda4af)'
  },
  { 
    name: 'Peach Glow', 
    src: 'radial-gradient(circle at 60% 40%, #FED7AA, #FDBA74, #FB923C)',
    preview: 'radial-gradient(circle at 60% 40%, #FED7AA, #FDBA74, #FB923C)'
  },
  { 
    name: 'Ocean Breeze', 
    src: 'radial-gradient(circle at 30% 30%, #BAE6FD, #7DD3FC, #38BDF8)',
    preview: 'radial-gradient(circle at 30% 30%, #BAE6FD, #7DD3FC, #38BDF8)'
  },
  { 
    name: 'Rose Quartz', 
    src: 'radial-gradient(circle at 100% 0%, #FDE4E4, #FCA5A5, #F87171)',
    preview: 'radial-gradient(circle at 100% 0%, #FDE4E4, #FCA5A5, #F87171)'
  },
  { 
    name: 'Sage Garden', 
    src: 'conic-gradient(from 180deg at 50% 50%, #D9F99D, #BEF264, #A3E635, #D9F99D)',
    preview: 'conic-gradient(from 180deg at 50% 50%, #D9F99D, #BEF264, #A3E635, #D9F99D)'
  },
  { 
    name: 'Twilight', 
    src: 'conic-gradient(from 0deg at 50% 50%, #C7D2FE, #A5B4FC, #818CF8, #C7D2FE)',
    preview: 'conic-gradient(from 0deg at 50% 50%, #C7D2FE, #A5B4FC, #818CF8, #C7D2FE)'
  },
  { 
    name: 'Desert Sand', 
    src: 'radial-gradient(circle at 50% 50%, #FEF3C7, #FDE68A, #FCD34D)',
    preview: 'radial-gradient(circle at 50% 50%, #FEF3C7, #FDE68A, #FCD34D)'
  }
]

function MonkeyCanvas({ state }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const loadAndDrawImages = async () => {
      ctx.fillStyle = '#FDF6E3'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const selectedBackground = backgroundItems.find(item => item.src === state.backgroundColor)
      
      if (selectedBackground) {
        let gradient;
        
        if (selectedBackground.src.includes('linear-gradient')) {
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          const colors = selectedBackground.src.match(/#[a-fA-F0-9]{6}/g)
          if (colors) {
            colors.forEach((color, index) => {
              gradient.addColorStop(index / (colors.length - 1), color)
            })
          }
        } else if (selectedBackground.src.includes('radial-gradient')) {
          gradient = ctx.createRadialGradient(
            canvas.width * 0.5, canvas.height * 0.5, 0,
            canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.5
          )
          const colors = selectedBackground.src.match(/#[a-fA-F0-9]{6}/g)
          if (colors) {
            colors.forEach((color, index) => {
              gradient.addColorStop(index / (colors.length - 1), color)
            })
          }
        } else if (selectedBackground.src.includes('conic-gradient')) {
          gradient = ctx.createConicGradient(0, canvas.width * 0.5, canvas.height * 0.5)
          const colors = selectedBackground.src.match(/#[a-fA-F0-9]{6}/g)
          if (colors) {
            colors.forEach((color, index) => {
              gradient.addColorStop(index / (colors.length - 1), color)
            })
          }
        }

        ctx.fillStyle = gradient || selectedBackground.src
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          if (!src) resolve(null)
          const img = new Image()
          img.onload = () => resolve(img)
          img.onerror = reject
          img.src = src
        })
      }

      try {
        const [body, clothes, head, hat, glasses, misc] = await Promise.all([
          loadImage(state.body),
          loadImage(state.clothes),
          loadImage(state.head),
          loadImage(state.hat),
          loadImage(state.glasses),
          loadImage(state.misc)
        ])

        if (body) ctx.drawImage(body, 0, 0, canvas.width, canvas.height)
        if (clothes) ctx.drawImage(clothes, 0, 0, canvas.width, canvas.height)
        if (head) ctx.drawImage(head, 0, 0, canvas.width, canvas.height)
        if (hat) ctx.drawImage(hat, 0, 0, canvas.width, canvas.height)
        if (glasses) ctx.drawImage(glasses, 0, 0, canvas.width, canvas.height)
        if (misc) ctx.drawImage(misc, 0, 0, canvas.width, canvas.height)
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadAndDrawImages()
  }, [state])

  return (
    <canvas 
      ref={canvasRef}
      width={500}
      height={500}
      style={{
        border: '2px solid #ccc',
        borderRadius: '8px'
      }}
    />
  )
}

export default MonkeyCanvas