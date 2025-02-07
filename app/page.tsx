import TeamMap from "@/components/TeamMap";
export default function Home() {
  return (
    <>
      <div id="team-list">
        <div className="pt-8 pb-10">
          <h1 className="text-4xl text-teal-500 font-extrabold text-center">
            EURO2020 NEXT
          </h1>
          <TeamMap></TeamMap>
        </div>
      </div>
    </>
  );
}
