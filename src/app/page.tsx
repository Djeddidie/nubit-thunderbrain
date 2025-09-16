"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import QuizCard from "../../components/QuizCard"



export default function Home() {
  const [twitterInput, setTwitterInput] = useState(""); // для введення ніку
  const [twitter, setTwitter] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showScheme, setShowScheme] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
const [showAnswerAnim, setShowAnswerAnim] = useState(false);
  
  const handleTwitterSubmit = () => {
  if (!twitterInput) return alert("Please enter your Twitter username!");
  const cleanUsername = twitterInput.replace("@", "");
  setTwitter(cleanUsername);
  setAvatarUrl(`https://unavatar.io/twitter/${cleanUsername}`);
};


  const questions = [
  {
    question: "What is Nubit building?",
    options: [
      "Ethereum Thunderstorm",
      "Bitcoin Lightning Network",
      "Bitcoin Thunderbolt",
      "Dogecoin Turbo"
    ],
    answer: 2
  },
  {
    question: "What does Bitcoin Thunderbolt aim to improve?",
    options: [
      "Only the price of Bitcoin",
      "Speed and programmability",
      "Mobile mining",
      "The Ethereum network"
    ],
    answer: 1
  },
  {
    question: "What is the key difference between Thunderbolt and Layer 2 or sidechain solutions?",
    options: [
      "Uses only private blocks",
      "Operates directly on Bitcoin’s mainnet",
      "Requires custodians",
      "Replaces miners with validators"
    ],
    answer: 1
  },
  {
    question: "What does the UTXO model used by Thunderbolt allow you to do?",
    options: [
      "Increase centralization",
      "Manage assets directly on Bitcoin",
      "Replace Bitcoin with a stablecoin",
      "Reduce the blockchain to a single block"
    ],
    answer: 1
  },
  {
    question: "What feature allows Thunderbolt users to transfer UTXO ownership instantly off-chain?",
    options: [
      "Trustless validation",
      "Cryptographic tweaks",
      "Layer 2 sidechains",
      "Miner approval"
    ],
    answer: 1
  },
  {
    question: "What gives Thunderbolt mathematically-backed assurance that it works as intended?",
    options: [
      "Peer-reviewed research and formal verification",
      "User polls and surveys",
      "Randomized stress tests only",
      "Miner consensus"
    ],
    answer: 0
  },
  {
    question: "What is the purpose of applying a key tweak in Thunderbolt?",
    options: [
      "To increase transaction fees",
      "To create a secret offset allowing only sender and recipient to spend",
      "To change Bitcoin’s consensus rules",
      "To replace UTXOs with ERC-20 tokens"
    ],
    answer: 1
  },
  {
    question: "Which of the following is a key benefit of Thunderbolt?",
    options: [
      "Instant delegation of ownership",
      "Requires waiting for multiple block confirmations",
      "Depends on a centralized custodian",
      "Only works on sidechains"
    ],
    answer: 0
  },
  {
    question: "What real-world advantage does UTXO Bundling provide in Thunderbolt?",
    options: [
      "Requires every transaction to be on-chain",
      "Enables fast, cheap, off-chain transfers with final settlement later",
      "Increases on-chain congestion and fees",
      "Only works for NFT trading"
    ],
    answer: 1
  },
  {
    question: "What is the main goal of Bitcoin Alpha on Bitcoin Thunderbolt?",
    options: [
      "To increase Bitcoin speculation",
      "To reward meaningful contributions and highlight builders",
      "To replace Bitcoin with a new token",
      "To centralize control of the network"
    ],
    answer: 1
  },
  {
    question: "What is the purpose of Boosting Code and Boostpad on Bitcoin Thunderbolt?",
    options: [
      "To grant exclusive access to advanced Thunderbolt features and encourage community engagement",
      "To mine Bitcoin faster",
      "To replace Bitcoin with USD1",
      "To centralize control of UTXOs"
    ],
    answer: 0
  },
  {
    question: "What is unique about USD1 on Bitcoin Thunderbolt?",
    options: [
      "It is tied to Ethereum",
      "It lives natively within Bitcoins UTXO model",
      "It requires custodial wallets",
      "It only works off-chain on sidechains"
    ],
    answer: 1
  },
];


  const tabs = [
    {
      title: "💡 Introduction",
      content: `Nubit is building Bitcoin Thunderbolt, the Bitcoin Boosting Network for native assets, trading, and verification. Bitcoin is renowned for its robust security and decentralization, but these strengths come with trade-offs that hinder its real-world practicality. Users face slow transactions, high fees, and limited programmability.`,
    },
    {
      title: "⚡ Thunderbolt Upgrade",
      content: `Bitcoin Thunderbolt tackles Bitcoins limitations: boosting transaction throughput, enhancing programmability, and retaining decentralization. This makes Bitcoin viable for daily use while opening doors to advanced applications.`,
    },
    {
      title: "🌐 Implications",
      content: `Bitcoin Thunderbolt reimagines Bitcoins infrastructure, enabling instant transactions, dApps, and streamlined asset management—all without compromising decentralization. It positions Bitcoin as the foundation of a new, decentralized global economy.`,
    },
  ];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace("@", "");
  setTwitter(value);
  setAvatarUrl(`https://unavatar.io/twitter/${value}`);
};

const nextQuestion = () => {
  if (selected === null) return alert("Select an answer!");

  // показати анімацію відповіді на 1 секунду
  setShowAnswerAnim(true);

  setTimeout(() => {
    // перевірка правильності
    if (selected === questions[currentQ].answer) {
      setScore(prev => (prev ?? 0) + 12);
    }

    setSelected(null);
    setShowAnswerAnim(false);

    // перейти до наступного питання або закінчити
    if (currentQ + 1 < questions.length) {
      setCurrentQ(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  }, 1000); // 1 секунда анімації
};

function getRank(score: number): "Spark" | "Pulse" | "Storm" | "SuperBolt" {
  if (score >= 108) return "SuperBolt"; // 75% і вище
  if (score >= 84) return "Storm";      // 50–74%
  if (score >= 60) return "Pulse";      // 25–49%
  return "Spark";                        // менше 25%
}



  /* ---------- PARAMETERS FOR UTXO BLOCK (you can tweak) ---------- */
  const utxoContainerHeight = 420; // px
  const utxoYouLeft = 20;
  const utxoYouTop = Math.floor(utxoContainerHeight / 2 - 40); // center vertically
  const utxoCenterLeft = 180; // left position of UTXO oval
  const utxoCenterTop = utxoYouTop;
  const chars = [
    // startLeft/startTop are starting positions (px) — spread them more to the right
    { emoji: "🧝🏻‍♀️", name: "Alice", startLeft: 420, startTop: 70, ampX: 120, ampY: 50, duration: 9 },
    { emoji: "👨🏻‍🔧", name: "Dave",  startLeft: 520, startTop: 120, ampX: 90,  ampY: 40, duration: 11 },
    { emoji: "🤖",      name: "Bob",   startLeft: 600, startTop: 200, ampX: 70,  ampY: 60, duration: 8  },
    { emoji: "🕵🏻‍♀️",  name: "Eve",   startLeft: 520, startTop: 260, ampX: 140, ampY: 80, duration: 13 },
    { emoji: "🦸🏽‍♀️", name: "Carol", startLeft: 420, startTop: 310, ampX: 100, ampY: 50, duration: 10 },
  ];
  /* ---------------------------------------------------------------- */

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* Background Video */}
      <video
        src="/bg.mp4"
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      />

      <div className="relative z-10">
       
        {/* 🔥 Top Banner */}
        <a
          href="https://www.nubit.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center font-bold py-3 bg-white/10 text-[#F25749] overflow-hidden"
        >
          NUBIT FOR LEARN
        </a>

        {/* Hero Block */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-8">
          <img
            src="/logo.png"
            alt="Nubit Logo"
            className="mb-6 transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]"
            style={{ width: "600px", height: "auto" }}
          />
          <h1 className="text-3xl font-bold mb-3 text-[#000000]">⚡🧠 Nubit ThunderBrain</h1>
          <p className="mb-6 max-w-xl text-[#000000]">
            Discover how exactly Nubit boost the Bitcoin network to another level with Bitcoin Core.
          </p>

          {/* Відео 1 */}
          <div className="flex flex-col items-center mb-4">
            <video
              src="/rawbtc.mp4"
              muted
              autoPlay
              loop
              className="w-[1200px] h-[90px] rounded-xl object-cover shadow-lg"
            />
            <p className="mt-2 text-[#000000] font-semibold text-center w-[1200px]">
              RAW BITCOIN NETWORK
            </p>
          </div>

          {/* Відео 2 */}
          <div className="flex flex-col items-center mb-6">
            <video
              src="/thunderbtc.mp4"
              muted
              autoPlay
              loop
              className="w-[1200px] h-[90px] rounded-xl object-cover shadow-lg"
            />
            <p className="mt-2 text-[#000000] font-semibold text-center w-[1200px]">
              BITCOIN THUNDERBOLT
            </p>
          </div>

          {/* Стат-блоки під відео */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 mb-16">
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg px-6 py-4 text-center text-[#000000] w-64">
              <p className="text-lg font-bold">⚡Transaction Time</p>
              <p className="text-4xl font-extrabold mt-1">0.05 sec</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg px-6 py-4 text-center text-[#000000] w-64">
              <p className="text-lg font-bold">🚀Faster</p>
              <p className="text-4xl font-extrabold mt-1">1000X</p>
            </div>
          </div>

          {/* Текст з кнопкою */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 animate-bounce">
            <p className="text-[#000000] font-semibold text-center">
              Scroll to begin your learning journey or
            </p>
            <a
              href="#quiz"
              className="bg-black text-[#F25749] px-4 py-2 rounded font-bold hover:bg-gray-200 transition"
            >
              Skip to Nubit ThunderBrain in final section
            </a>
          </div>
        </section>

        {/* Інтерактивні вкладки + картки */}
        <section className="relative py-20 px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Tabs */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6">
              <div className="flex gap-4 border-b border-gray-300 mb-4 overflow-x-auto">
                {tabs.map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                      activeTab === idx
                        ? "bg-black text-[#F25749] shadow"
                        : "text-gray-700 hover:text-[#F25749]"
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              <div className="text-black text-lg leading-relaxed">
                {tabs[activeTab].content}
              </div>
            </div>

            {/* Акцентні картки під вкладками */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-64 text-center text-black hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">⚡Fast Transactions</h3>
                <p>Enjoy instant settlements and ultra-low fees for daily payments.</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-64 text-center text-black hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">🛠 Programmable</h3>
                <p>Create dApps and manage digital assets without leaving Bitcoin mainnet.</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-64 text-center text-black hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">🔒 Secure & Decentralized</h3>
                <p>Retains Bitcoin’s trustless nature while enhancing functionality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-20 px-8 max-w-5xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-12 text-black">How It Works❔🤔</h2>

          {/* Cards for the 3 main points */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-72 text-center text-black hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2">⚡ Instant Ownership Transfers</h3>
              <p>
                Transfer UTXO ownership instantly off-chain by applying cryptographic tweaks, bypassing the need for immediate on-chain settlement.
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-72 text-center text-black hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2">🔒 Trustless Validation</h3>
              <p>
                Verified by decentralized committees using threshold Schnorr signatures, ensuring ownership changes are secure and enforceable on-chain.
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-72 text-center text-black hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2">🚀 Massive Efficiency Gains</h3>
              <p>
                Off-chain logic reduces congestion, improves throughput, and dramatically increases speed while maintaining Bitcoins security.
              </p>
            </div>
          </div>

          {/* Animated PNG */}
          <div className="relative flex justify-center mt-8">
            <img
              src="/offchain.png"
              alt="Off-chain Scheme"
              className="w-[800px] h-auto transition-transform duration-500 ease-in-out hover:translate-y-[-10px] hover:translate-x-[5px] animate-float"
            />
          </div>
        </section>

        {/* Years in the Making Section */}
        <section className="relative py-20 px-8 max-w-5xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-12 text-black">Years in the Making ⏳🔬</h2>

          <div className="flex flex-wrap justify-center gap-6">
            {/* 🧪 Years in the Making */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-72 text-center text-black hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4 animate-float">🧪</div>
              <h3 className="text-xl font-bold mb-2">Years in the Making</h3>
              <p>
                Thunderbolt is the result of years of R&D in collaboration with UCSB and distinguished researchers. Every component is peer-reviewed, tested, and formally verified.
              </p>
            </div>

            {/* 📐 Mathematical Security Guarantees */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-72 text-center text-black hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4 animate-float">📐</div>
              <h3 className="text-xl font-bold mb-2">Mathematical Security Guarantees</h3>
              <p>
                Using tools like the Tamarin Prover, Thunderbolt’s cryptography is rigorously proven correct. Developers and users get mathematically backed assurance.
              </p>
            </div>

            {/* 🎓 Academic and Institutional Trust */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-72 text-center text-black hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4 animate-float">🎓</div>
              <h3 className="text-xl font-bold mb-2">Academic and Institutional Trust</h3>
              <p>
                Thunderbolt is grounded in academic work, verified by advanced tooling, and backed by research organizations that understand real-world adoption.
              </p>
            </div>

            {/* 💹 Built for the Future of DeFi */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-72 text-center text-black hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4 animate-float">💹</div>
              <h3 className="text-xl font-bold mb-2">Built for the Future of DeFi</h3>
              <p>
                With a cryptographically sound foundation and scalable performance, Thunderbolt enables complex apps, DEXs, lending markets, and identity systems natively on Bitcoin.
              </p>
            </div>
          </div>
        </section>

{/* UTXO Bundling Section (SHIFTED RIGHT) */}
<section className="relative py-20 px-8 max-w-5xl mx-auto pl-20">   {/* 👈 додаємо pl-20 для зсуву вправо */}
  <h2 className="text-6xl font-bold text-center mb-12 text-black">
    UTXO Bundling 🔗
  </h2>

  <p className="text-black text-lg mb-12 max-w-3xl mx-auto text-center">
    UTXO Bundling lets you securely reassign the right to spend a group of UTXOs off-chain.
    It’s not just batching or compression — it’s a delegation system that preserves Bitcoin’s trust model while unlocking speed and scale.
  </p>

  <div className="relative w-full h-[420px] overflow-visible translate-x-8">
    {/* 👆 translate-x-8 додатково зміщує всю анімацію вправо */}
    
    {/* YOU: visible, fixed left */}
    <div
      className="absolute w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl text-black"
      style={{ left: utxoYouLeft, top: utxoYouTop, zIndex: 10 }}
    >
      👤
      <span className="absolute -bottom-6 text-black font-semibold">You</span>
    </div>

    {/* UTXO BUNDLING */}
    <div
      className="absolute rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl text-black"
      style={{ left: utxoCenterLeft, top: utxoCenterTop, width: 340, height: 92, zIndex: 10 }}
    >
      UTXO BUNDLING
    </div>

    {/* Characters: усі трохи вправо */}
{chars.map((c, i) => (
  <motion.div
    key={c.name}
    className="absolute rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl text-black translate-x-8"
    style={{
      width: 80,
      height: 80,
      // 👇 зберігаємо початкові координати
      left: c.startLeft + 200,
      top: c.startTop,
      zIndex: 9,
    }}
    animate={{
      x: [
        0,
        c.ampX * 0.7,
        -c.ampX * 0.3,
        c.ampX * 0.3,
        -c.ampX * 0.9,
        0,
      ],
      y: [
        0,
        -c.ampY * 0.1,
        c.ampY * 0.9,
        -c.ampY * 0.3,
        c.ampY * 0.1,
        0,
      ],
    }}
    transition={{
      repeat: Infinity,
      duration: c.duration,
      ease: "easeInOut",
      repeatType: "mirror",
    }}
  >
    <div style={{ fontSize: 30 }}>{c.emoji}</div>
    <span className="absolute -bottom-6 text-black font-semibold">
      {c.name}
    </span>
  </motion.div>
))}

  </div>
</section>

{/* ✅ Interactive Features Table */}
<div className="max-w-4xl mx-auto mt-12 mb-26">
  <table className="w-full border-separate border-spacing-y-3">
    <thead>
      <tr className="bg-black/10 text-black text-lg">
        <th className="p-4 rounded-l-xl text-left">⚙️ Feature</th>
        <th className="p-4 rounded-r-xl text-left">📜 Description</th>
      </tr>
    </thead>
    <tbody>
      {[
        {
          icon: "⚡",
          title: "Speed",
          desc: "Instant delegation of ownership, no block confirmations required."
        },
        {
          icon: "💰",
          title: "Low Cost",
          desc: "No UTXO merging → smaller tx size, lower on-chain fees."
        },
        {
          icon: "🔒",
          title: "Native Security",
          desc: "Built fully on Bitcoin’s signature & script primitives."
        },
        {
          icon: "🕵️‍♀️",
          title: "Privacy",
          desc: "Bundles stay off-chain until revealed."
        },
        {
          icon: "🧩",
          title: "Composability",
          desc: "Bundles can be split, re-bundled, or used in higher-level logic."
        }
      ].map((f, i) => (
        <tr
          key={i}
          className="group bg-white/20 backdrop-blur-md text-black transition
                     hover:bg-[#F25749]/20 hover:scale-[1.01] cursor-default">
          <td className="p-4 font-semibold rounded-l-xl">
            <span className="mr-2 text-xl">{f.icon}</span>
            {f.title}
          </td>
          <td className="p-4 rounded-r-xl">{f.desc}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<motion.h2
  className="text-5xl font-bold text-center text-black mb-8"
  initial={{ opacity: 0, y: 20 }}  // початковий стан: прозорий + трохи знизу
  animate={{ opacity: 1, y: 0 }}   // фінальний стан: видимий + на місці
  transition={{ duration: 1, ease: "easeOut" }}  // тривалість і плавність
>
  🚀 Bitcoin Alpha
</motion.h2>

{/* ------------------ Bitcoin Alpha Info Block ------------------ */}
<section className="py-12 px-8 max-w-5xl mx-auto bg-white/20 backdrop-blur-md rounded-xl shadow-lg mb-12">
  <p className="text-lg text-black/90 max-w-3xl mx-auto mb-6">
    Bitcoin Alpha is an initiative on <strong>Bitcoin Thunderbolt</strong> designed to accelerate the next era of Bitcoin by rewarding meaningful contributions to the network.
  </p>
  <p className="text-lg text-black/90 max-w-3xl mx-auto mb-6">
    Every contribution, from staking to deploying and supporting projects, earns recognition through the <strong>Alpha Points</strong> system. Early participants can unlock additional boosts to maximize their rewards.
  </p>
  <p className="text-lg text-black/90 max-w-3xl mx-auto mb-6">
    Bitcoin Alpha projects are backed by academic researchers and leading funds, focusing on real products, resilient infrastructure, and active builders driving Bitcoins momentum forward.
  </p>

  <div className="flex flex-wrap justify-center gap-6 mt-8">
    <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-64 text-center text-black hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-bold mb-2">💎 Contributors</h3>
      <p>54388 active builders</p>
    </div>
    <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-64 text-center text-black hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-bold mb-2">⚡ Alpha Points</h3>
      <p>Track and reward meaningful contributions</p>
    </div>
    <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-64 text-center text-black hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-bold mb-2">📈 Impact</h3>
      <p>Boost Bitcoin network growth and adoption</p>
    </div>
  </div>
</section>

{/* ------------------ Boosting Code & Boostpad ------------------ */}
<section className="relative py-20 px-8 max-w-5xl mx-auto">
  <motion.h2
    className="text-5xl font-bold text-center mb-12 text-black"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    🚀 Boosting Code & Boostpad: Empowering the Bitcoin Community
  </motion.h2>

  <motion.p
    className="text-black text-lg max-w-3xl mx-auto mb-12 text-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.2, delay: 0.2 }}
    viewport={{ once: true }}
  >
    Boosting Code is an innovative mechanism designed to make this upgrade inclusive, engaging the entire Bitcoin community in its evolution.
  </motion.p>

  <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
    {/* Boosting Code Card */}
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 flex-1 text-black hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold mb-4">💎 Boosting Code</h3>
      <p className="mb-4">
        Exclusive keys that grant access to Bitcoin Thunderbolt’s advanced features, such as instant UTXO-based transactions, programmable smart contracts, and native stablecoin integration (e.g., USD1).
      </p>
      <p>
        Codes are distributed in limited batches through Boostpad and community-driven initiatives on X and Discord, rewarding active participation.
      </p>
    </motion.div>

    {/* Boostpad Card */}
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 flex-1 text-black hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold mb-4">⚡ Boostpad</h3>
      <p className="mb-4">
        A dynamic platform that grants every user an hourly raffle entry for Boosting Code. Connect your wallet, claim a code, and instantly join Thunderbolt’s ecosystem.
      </p>
      <p>
        Codes are released in small, frequent waves, encouraging regular engagement — check back often to secure your spot!
      </p>
    </motion.div>
  </div>

  {/* Benefits List */}
  <motion.ul
    className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-black text-lg"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    }}
  >
    {[
      "Experience near-instant transactions powered by Thunderbolt’s off-chain UTXO bundling.",
      "Build or interact with decentralized applications (dApps) enabled by enhanced programmability.",
      "Engage with Bitcoin-native financial tools, like USD1 for global payments or DeFi solutions.",
      "Join a collaborative community that drives Bitcoin’s growth, ensuring a fast, flexible platform while staying decentralized."
    ].map((item, idx) => (
      <motion.li
        key={idx}
        className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-300"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        {item}
      </motion.li>
    ))}
  </motion.ul>

  <motion.p
    className="text-black text-center mt-12 max-w-3xl mx-auto text-lg font-semibold"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.6 }}
    viewport={{ once: true }}
  >
    
  </motion.p>
</section>

{/* Quiz Block */}

<section id="quiz" className="py-16 px-8 max-w-2xl mx-auto text-center space-y-6">
  <h2 className="text-7xl font-bold mb-4 text-black">⚡️🧠ThunderBrain Quiz</h2>

  {/* Введення твіттера */}
  {!twitter && (
    <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <p className="mb-4 text-black font-semibold">
        Enter your Twitter username to start the quiz
      </p>
      <input
        type="text"
        placeholder="Twitter username"
        value={twitterInput}
        onChange={(e) => setTwitterInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleTwitterSubmit(); }}
        className="p-3 rounded w-full text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#F25749]"
      />
    </div>
  )}

  {/* Показ аватарки після submit */}
  {avatarUrl && !quizFinished && (
    <div className="mt-6">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto border-4 border-[#F25749]"
      />

      <div className="space-y-4 text-left mt-6">
        <p className="font-bold">{questions[currentQ].question}</p>

        {questions[currentQ].options.map((opt, idx) => {
          const isCorrect = idx === questions[currentQ].answer;
          const isSelected = idx === selected;

          return (
            <button
              key={idx}
              onClick={() => !showAnswerAnim && setSelected(idx)}
              className={`
                block w-full text-left p-2 rounded border
                ${selected === idx ? "bg-white text-[#F25749]" : "border-white"}
                ${showAnswerAnim && isCorrect ? "bg-green-400 text-white animate-pulse" : ""}
                ${showAnswerAnim && isSelected && !isCorrect ? "bg-black text-black animate-shake" : ""}
              `}
            >
              {opt}
            </button>
          );
        })}

        <button
          onClick={nextQuestion}
          disabled={showAnswerAnim}
          className="mt-4 bg-black text-[#F25749] px-6 py-2 rounded font-bold hover:bg-gray-200 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )}

{/* Фінальний результат */}
  {quizFinished && score !== null && (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <QuizCard
      twitter={twitter}
      avatarUrl={avatarUrl}
      score={score}
      rank={getRank(score)}
    />
  </motion.div>
)}

<button
  onClick={() => {
    const tweetText = `My score ${score} in the Nubit ⚡️🧠ThunderBrain Quiz!
My rank: ${getRank(score)} 🚀. Test yours at https://nubit-thunderbrain.vercel.app/
@nubit_org is where Bitcoin gets faster.`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
  }}
  className="mt-4 bg-black text-[#F25749] px-6 py-2 rounded font-bold hover:bg-white-600 transition"
>
  Share on Twitter
</button>

</section>

        {/* Footer */}
        <footer className="py-6 text-center">
          <p>© 2025 Nubit ThunderBrain. Built by <h3 className="text-2xl font-bold">
  <a
    href="https://x.com/0xDjeddie"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    djeddie
  </a>
</h3></p>
        </footer>
      </div>
    </div>
  );
}
