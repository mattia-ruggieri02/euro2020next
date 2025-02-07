import DeleteRequest from "./DeleteRequest";
import GetRequest from "./GetRequest";
import PostRequest from "./PostRequest";
import PutRequest from "./PutRequest";

interface Requests {
  countryCode: string;
  onBackClick: () => void;
}

const Requests: React.FC<Requests> = ({ countryCode, onBackClick }) => {
  return (
    <>
      <div className="mt-10 p-5 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-semibold text-black">
          Squadra selezionata
        </h2>
        <p className="font-semibold text-black">
          Hai selezionato la squadra con country_code: {countryCode}
        </p>
        <button
          className="rounded-md px-4 py-2 bg-teal-300 text-white font-bold hover:bg-blue-600 mt-5"
          onClick={onBackClick}
        >
          Torna indietro
        </button>
      </div>
      <GetRequest countryCode={countryCode}></GetRequest>
      <PostRequest countryCode={countryCode}></PostRequest>
      <PutRequest countryCode={countryCode}></PutRequest>
      <DeleteRequest countryCode={countryCode}></DeleteRequest>
    </>
  );
};

export default Requests;
