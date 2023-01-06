import React from 'react'
import HomeSearch from 'components/home/search'
import HomeList from 'components/home/list'
function HomeView(props: any) {
  return (
    <div className="container mt-2">
      <HomeSearch 
        {...props}
      />
      <HomeList 
        {...props}
      />
    </div>
  )
}

export default HomeView
