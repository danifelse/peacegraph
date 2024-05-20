export default function CardProduct({ name, price, imageUrl }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={imageUrl} alt="" />
      <div className="px-5 py-2">
        <h5 className="mb-1 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className=" text-xs text-gray-700 dark:text-gray-400">
          Rp. {price?.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
