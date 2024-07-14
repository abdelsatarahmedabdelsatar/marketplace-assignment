import ClipLoader from "react-spinners/ClipLoader";

function Spinner({loading,color,size}) {
  return (
    <>
    <div className="flex justify-center">
      <ClipLoader color={color} loading={loading} size={size}/>
    </div>
    </>
  );
}

export default Spinner;
