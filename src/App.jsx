const Card = ({ title }) => {
  return(
    <div className="card">

      <h2>{ title }</h2>
     
    </div>
  )
}


const App = () => {
  return (
    <div className="card-container">

    <Card title="Star Wars" rating={5} isCool={true} />
    <Card title="Avatar" />
    <Card title="The Lion King" />
    </div>
  )
}

export default App
