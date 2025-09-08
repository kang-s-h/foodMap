function LoadingSpinner() {
  return (
    <div className="h-full flex justify-center items-center p-4">
      <div className=" w-40 h-40 border-10 border-gray-200 border-t-10 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
