export default function EmptyPanel(props: { text: string }) {
  return (
    <div className=" hp-100 flex-center flex-col">
      <img className="w-100px h-100px" src="src/assets/open-box.png" />
      <span className="mt-3px" style={{ color: '#c48d69' }}>{props.text ? props.text : 'No Results'}</span>
    </div>
  )
}
