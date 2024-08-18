export default function Loader({ show }: { show: string }) {
  return (
    <>
      <div
        className={`loader-overlay flex justify-center items-center w-[100vw] h-[100vh] bg-black bg-opacity-80 fixed top-0 left-0 z-50 ${show}`}
      >
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </>
  );
}
