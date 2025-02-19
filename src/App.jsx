import { useState } from 'react'
import MonkeyCanvas from './components/MonkeyCanvas'
import AssetSelector from './components/AssetSelector'
import { backgroundItems } from './components/MonkeyCanvas'
import './styles/main.css'
import { motion } from 'framer-motion'

const NoneItem = () => (
  <div style={{ 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    <span style={{ 
      fontSize: '24px', 
      color: '#2C1810', 
      fontWeight: 'bold' 
    }}>
      ✕
    </span>
  </div>
)

function App() {
  const [monkeyState, setMonkeyState] = useState({
    head: '/assets/heads/default-head.png',
    body: '/assets/body/default-body.png',
    backgroundColor: '#ffffff',
    backgroundTexture: null,
    clothes: null,
    hat: null,
    glasses: null,
    misc: null
  })

  const headItems = [
    { name: 'Default Head', src: '/assets/heads/default-head.png' },
    { name: 'Black Head', src: '/assets/heads/black-head.png' },
    { name: 'Brown Head', src: '/assets/heads/brown-head.png' },
    { name: 'Grey Head', src: '/assets/heads/grey-head.png' },
    { name: 'Purple Head', src: '/assets/heads/purple-head.png' },
    { name: 'Red Head', src: '/assets/heads/red-head.png' },
    { name: 'Yellow Head', src: '/assets/heads/yellow-head.png' },
    { name: 'Aqua Head', src: '/assets/heads/aqua-head.png' },
  ]

  const bodyItems = [
    { name: 'Default Body', src: '/assets/body/default-body.png' },
    { name: 'Black Body', src: '/assets/body/black-body.png' },
    { name: 'Brown Body', src: '/assets/body/brown-body.png' },
    { name: 'Grey Body', src: '/assets/body/grey-body.png' },
    { name: 'Purple Body', src: '/assets/body/purple-body.png' },
    { name: 'Red Body', src: '/assets/body/red-body.png' },
    { name: 'Yellow Body', src: '/assets/body/yellow-body.png' },
    { name: 'Aqua Body', src: '/assets/body/aqua-body.png' },
  ]

  const clothingItems = [
    { name: 'None', src: null, icon: <NoneItem />, isNone: true },
    { name: 'Brown Sweater', src: '/assets/clothes/brown-sweater.png' },
    { name: 'Blue Sweater', src: 'assets/clothes/blue-sweater.png' },
    { name: 'Light Blue Sweater', src: 'assets/clothes/light-blue-sweater.png' },
    { name: 'Red Sweater', src: 'assets/clothes/red-sweater.png' },
    { name: 'Orange Sweater', src: 'assets/clothes/orange-sweater.png' },
    { name: 'Green Sweater', src: 'assets/clothes/green-sweater.png' },
    { name: 'Pink Sweater', src: 'assets/clothes/pink-sweater.png' },
    { name: 'Grey Sweater', src: 'assets/clothes/grey-sweater.png' },
    { name: 'Suit Red', src: 'assets/clothes/suit-red.png' },
    { name: 'Suit Blue', src: 'assets/clothes/suit-blue.png' },
    { name: 'Suit Green', src: 'assets/clothes/suit-green.png' },
    { name: 'Suit Purple', src: 'assets/clothes/suit-purple.png' },
    { name: 'Suit Brown', src: 'assets/clothes/suit-brown.png' },
    { name: 'Red Hoodie', src: 'assets/clothes/hoodie-red.png' },
    { name: 'Blue Hoodie', src: 'assets/clothes/hoodie-blue.png' },
    { name: 'Green Hoodie', src: 'assets/clothes/hoodie-green.png' },
    { name: 'Brown Hoodie', src: 'assets/clothes/hoodie-brown.png' },
    { name: 'Purple Hoodie', src: 'assets/clothes/hoodie-purple.png' },
  ]

  const hatItems = [
    { name: 'None', src: null, icon: <NoneItem />, isNone: true },
    { name: 'Hat-1', src: '/assets/hats/hat-1.png' },
    { name: 'Hat-2', src: '/assets/hats/hat-2.png' },
    { name: 'Hat-3', src: '/assets/hats/hat-3.png' },
    { name: 'Hat-4', src: '/assets/hats/hat-4.png' },
    { name: 'Hat-5', src: '/assets/hats/hat-5.png' },
    { name: 'Hat-6', src: '/assets/hats/hat-6.png' },
    { name: 'Hat-7', src: '/assets/hats/hat-7.png' },
  ]

  const glassesItems = [
    { name: 'None', src: null, icon: <NoneItem />, isNone: true },
    { name: 'Glasses-1', src: '/assets/glasses/glasses-1.png' },
    { name: 'Glasses-2', src: '/assets/glasses/glasses-2.png' },
    { name: 'Glasses-3', src: '/assets/glasses/glasses-3.png' },
    { name: 'Glasses-4', src: '/assets/glasses/glasses-4.png' },
    { name: 'Glasses-5', src: '/assets/glasses/glasses-5.png' },
    { name: 'Glasses-6', src: '/assets/glasses/glasses-6.png' },
    { name: 'Glasses-7', src: '/assets/glasses/glasses-7.png' },
    { name: 'Thug Glasses', src: '/assets/glasses/thug-glasses.png' },
  ]

  const miscItems = [
    { name: 'None', src: null, icon: <NoneItem />, isNone: true },
    { name: 'Misc-1', src: '/assets/misc/misc-1.png' },
    { name: 'Misc-2', src: '/assets/misc/misc-2.png' },
    { name: 'Misc-3', src: '/assets/misc/misc-3.png' },
    { name: 'Misc-4', src: '/assets/misc/misc-4.png' },
    { name: 'Misc-5', src: '/assets/misc/misc-5.png' },
  ]

  const handleReset = () => {
    setMonkeyState({
      head: '/assets/heads/default-head.png',
      body: '/assets/body/default-body.png',
      backgroundColor: '#ffffff',
      backgroundTexture: null,
      clothes: null,
      hat: null,
      glasses: null,
      misc: null
    })
  }

  const handleRandomize = () => {
    // Misc itemlerden belirli öğeleri filtrele
    const filteredMiscItems = miscItems.filter(item => {
      const excludedItems = ['misc-1.png', 'misc-4.png', 'misc-5.png'];
      return !excludedItems.some(excluded => item.src?.includes(excluded));
    });

    setMonkeyState({
      ...monkeyState,
      head: headItems[Math.floor(Math.random() * headItems.length)]?.src,
      body: bodyItems[Math.floor(Math.random() * bodyItems.length)]?.src,
      clothes: clothingItems[Math.floor(Math.random() * clothingItems.length)]?.src,
      hat: hatItems[Math.floor(Math.random() * hatItems.length)]?.src,
      glasses: glassesItems[Math.floor(Math.random() * glassesItems.length)]?.src,
      misc: filteredMiscItems[Math.floor(Math.random() * filteredMiscItems.length)]?.src,
      backgroundColor: backgroundItems[Math.floor(Math.random() * backgroundItems.length)]?.src,
    })
  }

  const handleDownload = async () => {
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = 1500
    tempCanvas.height = 1500
    const tempCtx = tempCanvas.getContext('2d')
    
    tempCtx.fillStyle = '#FDF6E3'
    tempCtx.fillRect(0, 0, 1500, 1500)
    
    const selectedBackground = backgroundItems.find(item => item.src === monkeyState.backgroundColor)
    if (selectedBackground) {
      let gradient;
      if (selectedBackground.src.includes('linear-gradient')) {
        gradient = tempCtx.createLinearGradient(0, 0, 1500, 1500)
        const colors = selectedBackground.src.match(/#[a-fA-F0-9]{6}/g)
        if (colors) {
          colors.forEach((color, index) => {
            gradient.addColorStop(index / (colors.length - 1), color)
          })
        }
      } else if (selectedBackground.src.includes('radial-gradient')) {
        gradient = tempCtx.createRadialGradient(750, 750, 0, 750, 750, 750)
        const colors = selectedBackground.src.match(/#[a-fA-F0-9]{6}/g)
        if (colors) {
          colors.forEach((color, index) => {
            gradient.addColorStop(index / (colors.length - 1), color)
          })
        }
      } else if (selectedBackground.src.includes('conic-gradient')) {
        gradient = tempCtx.createConicGradient(0, 750, 750)
        const colors = selectedBackground.src.match(/#[a-fA-F0-9]{6}/g)
        if (colors) {
          colors.forEach((color, index) => {
            gradient.addColorStop(index / (colors.length - 1), color)
          })
        }
      }
      tempCtx.fillStyle = gradient || selectedBackground.src
      tempCtx.fillRect(0, 0, 1500, 1500)
    }

    const loadAndDrawImage = (src) => {
      return new Promise((resolve, reject) => {
        if (!src) resolve()
        const img = new Image()
        img.onload = () => {
          tempCtx.drawImage(img, 0, 0, 1500, 1500)
          resolve()
        }
        img.onerror = reject
        img.src = src
      })
    }

    try {
      await Promise.all([
        loadAndDrawImage(monkeyState.body),
        loadAndDrawImage(monkeyState.clothes),
        loadAndDrawImage(monkeyState.head),
        loadAndDrawImage(monkeyState.hat),
        loadAndDrawImage(monkeyState.glasses),
        loadAndDrawImage(monkeyState.misc)
      ])

      const link = document.createElement('a')
      link.download = 'my-fingermonkey.png'
      link.href = tempCanvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Error during download:', error)
    }
  }

  return (
    <div className="playground">
      <div className="navbar">
        <img src="/assets/logo_fm.png" alt="FingerMonkeys Logo" className="logo" />
        <h1 className="title">Create your FingerMonkey</h1>
      </div>

      <div className="game-zone">
        <div className="customization-area">
          <div className="canvas-box">
            <MonkeyCanvas state={monkeyState} />
          </div>
          
          <div className="action-buttons">
            <button className="fun-btn" onClick={handleReset}>
              Reset Monkey ↺
            </button>
            <button className="fun-btn" onClick={handleRandomize}>
              Generate Random ⚄
            </button>
            <button className="fun-btn" onClick={handleDownload}>
              Download ↓
            </button>
          </div>
        </div>

        <div className="wardrobe-area">
          <div className="wardrobe-content">
            <AssetSelector 
              category="Style"
              selected={monkeyState.backgroundColor}
              onChange={(backgroundColor) => setMonkeyState({...monkeyState, backgroundColor})}
              items={backgroundItems}
            />

            <AssetSelector 
              category="Head"
              selected={monkeyState.head}
              onChange={(head) => setMonkeyState({...monkeyState, head})}
              items={headItems}
            />

            <AssetSelector 
              category="Body"
              selected={monkeyState.body}
              onChange={(body) => setMonkeyState({...monkeyState, body})}
              items={bodyItems}
            />

            <AssetSelector 
              category="Clothes"
              selected={monkeyState.clothes}
              onChange={(clothes) => setMonkeyState({...monkeyState, clothes})}
              items={clothingItems}
            />

            <AssetSelector 
              category="Hats"
              selected={monkeyState.hat}
              onChange={(hat) => setMonkeyState({...monkeyState, hat})}
              items={hatItems}
            />

            <AssetSelector 
              category="Glasses"
              selected={monkeyState.glasses}
              onChange={(glasses) => setMonkeyState({...monkeyState, glasses})}
              items={glassesItems}
            />

            <AssetSelector 
              category="Misc"
              selected={monkeyState.misc}
              onChange={(misc) => setMonkeyState({...monkeyState, misc})}
              items={miscItems}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App