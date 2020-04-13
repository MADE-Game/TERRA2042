import React, {useState, useRef} from 'react'

export const renderTime = time => {
  const currentTime = useRef(time)
  const prevTime = useRef(null)
  const isNewTimeFirstTick = useRef(false)
  const [_, setOneLastRerender] = useState(0)

  if (currentTime.current !== time) {
    isNewTimeFirstTick.current = true
    prevTime.current = currentTime.current
    currentTime.current = time
  } else {
    isNewTimeFirstTick.current = false
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (time === 0) {
    setTimeout(() => {
      setOneLastRerender(val => val + 1)
    }, 20)
  }

  const isTimeUp = isNewTimeFirstTick.current

  return (
    <div className="time-wrapper">
      <div key={time} className={`time ${isTimeUp ? 'up' : ''}`}>
        {time}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? 'down' : ''}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  )
}
