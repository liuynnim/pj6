const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <div style={info.type === "danger" ? { color: "red" } : { color: "#3fbdbd" }}>{info.message}</div>
  )
}

export default AlertMessage