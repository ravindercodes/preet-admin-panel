import TotalCase from '../../../images/totalCase.svg'
const GridCard = ({index, count, text}) => {
  return (
    <li key={index} className="grid_card">
      <div className="gridcard_image">
        <img src={TotalCase} alt="total cases" />
      </div>
      <div className="gridcard_content">
        <span className="total">{text}</span>
        <h5>{count}</h5>
      </div>
    </li>
  )
}
export default GridCard
