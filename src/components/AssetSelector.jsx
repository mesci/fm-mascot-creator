import { useState, useEffect } from 'react'

function AssetSelector({ category, selected, onChange, items }) {
  const [startIndex, setStartIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(4)
      } else {
        setItemsPerPage(6)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="asset-selector">
      <h3>{category}</h3>
      <div className="slider-container">
        <div 
          className="item slider-btn" 
          onClick={() => setStartIndex(Math.max(0, startIndex - itemsPerPage))}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="items-grid">
          {items.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
            <div
              key={startIndex + index}
              className={`item ${selected === item.src ? 'selected' : ''}`}
              data-type={category.toLowerCase()}
              onClick={() => onChange(item.src)}
              style={
                category.toLowerCase() === 'style' 
                  ? { background: item.preview }
                  : {}
              }
            >
              {category.toLowerCase() === 'style' ? null : (
                item.isNone ? item.icon : <img src={item.src} alt="" />
              )}
            </div>
          ))}
        </div>

        <div 
          className="item slider-btn" 
          onClick={() => setStartIndex(Math.min(items.length - itemsPerPage, startIndex + itemsPerPage))}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AssetSelector