
import TopModal from './components/TopModal/TopModal'
import PokemonComplex from './components/asyncPokemons/PokemonComplex'

type Props = {}

const App = (props: Props) => {
  return (
    <>
    {/* <TopModal
      autoId={1}
      setModalShow={() => {
        console.log("SetModalShow");
      }}
      topLevel={{
        top: 30,
        expire: "2024-08-20",
      }}
      langId={2}
      salonDateClosed={"2024-09-17"}
      vin={"1234567890ABCDEFG"}
    /> */}
      <PokemonComplex />
    </>
  )
}

export default App