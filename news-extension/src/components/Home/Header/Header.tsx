import React from 'react'

interface Props {
  handleSearch: (event: any) => void
}
const Header: React.FC<Props> = ({ handleSearch }) => (
  <>
    <header className="container p-4 text-center">
      <input
        type="search"
        placeholder="Search News..."
        className="search"
        onKeyDown={(event) => handleSearch(event)}
      />
    </header>
  </>
)

export { Header }
