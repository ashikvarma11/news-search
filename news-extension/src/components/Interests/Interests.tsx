import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Interests.scss'

const interestCollection = new Set([
  { id: 1, name: 'General' },
  { id: 2, name: 'Business' },
  { id: 3, name: 'Entertainment' },
  { id: 4, name: 'Health' },
  { id: 5, name: 'Science' },
  { id: 6, name: 'Sports' },
  { id: 7, name: 'Technology' },
])

const Interests: React.FC<{}> = () => {
  const history = useHistory()
  const [interests, setInterests] = React.useState<Set<any>>(new Set([]))
  const [counter, setCounter] = React.useState<number>(0)

  const handleSelection = (interest: any) => {
    let temp = interests
    const isAlreadyPresent = isSelected(temp, interest)
    if (!isAlreadyPresent) {
      temp = temp.add(interest)
      setInterests(temp)
    } else {
      temp.delete(interest)
      setInterests(temp)
    }
    setTimeout(() => setCounter((prev) => prev + 1), 0)
  }

  const isSelected = (interestSet: any, currInterest: any) =>
    Array.from(interestSet).some((inter: any) => inter.id === currInterest.id)

  const getClassName = (interest: any) =>
    isSelected(interests, interest) ? 'interest_card bg_selected' : 'interest_card'

  const handleNext = () => {
    localStorage.setItem('interests', JSON.stringify(Array.from(interests)))
    history.push('/home')
  }

  useEffect(() => {
    if (localStorage.getItem('interests') !== null) {
      history.push('/home', { interests: Array.from(interests) })
    }
  }, [])
  return (
    <>
      <div className="interest_card_list_wrapper">
        <h1>Interests</h1>
        <div className="interest_card_list">
          {interestCollection &&
            Array.from(interestCollection).map((interest, idx) => (
              <div
                key={idx}
                className={getClassName(interest)}
                onClick={(event: any) => handleSelection(interest)}
              >
                {interest.name}
              </div>
            ))}
        </div>
        <button
          className="forward_btn"
          onClick={handleNext}
          disabled={Array.from(interests).length < 1}
        >
          Next
        </button>
      </div>
    </>
  )
}

export { Interests }
