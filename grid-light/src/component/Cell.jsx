import React from 'react'

function Cell({filled, onClick, diactive}) {
  return (
    <button disabled={diactive} onClick={onClick} className={filled ? 'cell cell-ativated' : 'cell'} />
  )
}

export default Cell