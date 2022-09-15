import './styles/main.css';

import logoNLW from './assets/logo-nlw.svg';

function App() {
  return (
    <div className="max-w-[1344] mx-auto flex flex-col items-center my-20">
      <img src={logoNLW} alt="Logo NLW" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="" className="relative">
          <img src="/game-1.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative">
          <img src="/game-2.png" alt="" />
        </a>
        <a href="" className="relative">
          <img src="/game-3.png" alt="" />
        </a>
        <a href="" className="relative">
          <img src="/game-4.png" alt="" />
        </a>
        <a href="" className="relative">
          <img src="/game-5.png" alt="" />
        </a>
        <a href="" className="relative">
          <img src="/game-6.png" alt="" />
        </a>
      </div>
    </div>
  );
}

export default App;
