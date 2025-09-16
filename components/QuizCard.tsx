interface QuizCardProps {
  twitter: string;
  avatarUrl: string;
  score: number;
  rank: "Spark" | "Pulse" | "Storm" | "SuperBolt";
}

const rankBackgrounds: Record<QuizCardProps["rank"], string> = {
  Spark: "/rank-spark.png",
  Pulse: "/rank-pulse.png",
  Storm: "/rank-storm.png",
  SuperBolt: "/rank-superbolt.png",
};

export default function QuizCard({ twitter, avatarUrl, score, rank }: QuizCardProps) {
  return (
    <div
      className="relative rounded-xl shadow-lg p-6 text-white max-w-md mx-auto flex items-center"
      style={{
        backgroundImage: `url(${rankBackgrounds[rank]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Ліва частина: аватарка та дані */}
      <div className="flex flex-col items-start mr-4">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-4 border-white mb-2"
        />
        <h3 className="text-3xl font-bold">{twitter}</h3>
        <p className="mt-1">Rank: {rank}</p>
      </div>

      {/* Права частина: рахунок */}
      <div className="ml-auto text-right">
        <p className="text-2xl font-bold">Score: {score}</p>
      </div>
    </div>
  );
}
