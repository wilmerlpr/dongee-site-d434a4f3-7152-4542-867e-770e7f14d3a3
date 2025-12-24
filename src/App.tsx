import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Eye, Ghost, Dna, Sparkles, Trash2, Plus } from 'lucide-react';
import { SurrealButton } from './components/SurrealButton';
import { INITIAL_PRIZES, INITIAL_PARTICIPANTS } from './data/mockData';

interface Prize {
  id: number;
  name: string;
  curse: string;
}

function App() {
  const [participants, setParticipants] = useState<string[]>(INITIAL_PARTICIPANTS);
  const [newParticipant, setNewParticipant] = useState('');
  const [prizes] = useState<Prize[]>(INITIAL_PRIZES);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<{ name: string; prize: Prize } | null>(null);
  const [chaosLevel, setChaosLevel] = useState(0);

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newParticipant.trim()) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
      setChaosLevel(prev => prev + 1);
    }
  };

  const removeParticipant = (index: number) => {
    const newP = [...participants];
    newP.splice(index, 1);
    setParticipants(newP);
  };

  const triggerRaffle = () => {
    if (participants.length === 0) return;
    setIsSpinning(true);
    setWinner(null);

    let duration = 3000;
    let interval = 100;
    
    const intervalId = setInterval(() => {
      setChaosLevel(Math.random() * 10);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      setIsSpinning(false);
      
      const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      
      setWinner({ name: randomParticipant, prize: randomPrize });
      
      confetti({
        particleCount: 150,
        spread: 180,
        colors: ['#84cc16', '#f43f5e', '#ffffff'],
        shapes: ['star', 'circle']
      });

    }, duration);
  };

  return (
    <div className="min-h-screen p-4 md:p-10 font-mono selection:bg-rose-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Surrealista */}
        <header className="text-center space-y-4 relative">
          <motion.div 
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="inline-block bg-lime-400 text-black px-4 py-1 font-bold text-xs uppercase tracking-[0.3em]"
          >
            Asociación de Vecinos del No-Lugar
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black glitch-text uppercase">
            La Gran Rifa <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-violet-500">Metafísica</span>
          </h1>
          <p className="text-stone-500">Probabilidad de colapso: {chaosLevel.toFixed(1)}%</p>
        </header>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Columna Izquierda: Participantes */}
          <div className="border-4 border-stone-800 p-6 bg-stone-900/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl"></div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Eye className="text-rose-500 animate-pulse" /> 
                Almas Inscritas
              </h2>
              <span className="text-stone-600 font-bold">{participants.length}</span>
            </div>

            <form onSubmit={handleAddParticipant} className="flex gap-2 mb-6">
              <input
                type="text"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                placeholder="Nombre del ente..."
                className="flex-1 bg-black border-2 border-stone-700 p-3 text-lime-400 focus:outline-none focus:border-lime-400 placeholder:text-stone-700"
              />
              <button type="submit" className="bg-stone-800 p-3 hover:bg-lime-900 transition-colors border-2 border-stone-700">
                <Plus />
              </button>
            </form>

            <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {participants.map((p, i) => (
                  <motion.li
                    key={`${p}-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="flex justify-between items-center bg-stone-950/50 p-3 border border-stone-800 hover:border-lime-500/50 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Ghost size={14} className="text-stone-600" />
                      {p}
                    </span>
                    <button 
                      onClick={() => removeParticipant(i)}
                      className="text-stone-700 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Columna Derecha: Control y Premios */}
          <div className="space-y-8 flex flex-col justify-center">
            
            <div className="bg-stone-900 p-6 border-2 border-dashed border-stone-700 relative">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-violet-400">
                <Dna /> Premios Potenciales
              </h3>
              <ul className="text-sm space-y-3 text-stone-400">
                {prizes.slice(0, 3).map(prize => (
                  <li key={prize.id} className="flex items-start gap-2">
                    <span className="text-rose-500">⚠</span>
                    <span>
                      <strong className="text-stone-300">{prize.name}</strong>
                      <br/>
                      <span className="text-xs text-stone-600 italic">Maldición: {prize.curse}</span>
                    </span>
                  </li>
                ))}
                <li className="text-center text-xs pt-2 opacity-50">+ {prizes.length - 3} objetos dimensionales más...</li>
              </ul>
            </div>

            <div className="flex justify-center">
               <SurrealButton 
                onClick={triggerRaffle} 
                disabled={isSpinning || participants.length === 0}
                className="w-full text-xl py-6"
               >
                 {isSpinning ? "ALTERANDO REALIDAD..." : "INVOCAR GANADOR"}
               </SurrealButton>
            </div>

          </div>
        </div>

        {/* Modal del Ganador */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
              onClick={() => setWinner(null)}
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-gradient-to-br from-stone-900 to-black border-4 border-lime-400 p-8 max-w-lg w-full text-center relative shadow-[0_0_50px_rgba(132,204,22,0.3)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute -top-6 -right-6 bg-rose-500 text-white p-4 rotate-12 font-black text-2xl shadow-lg">
                  ¡FATALIDAD!
                </div>
                
                <Sparkles className="w-16 h-16 mx-auto text-yellow-400 mb-4 animate-spin-slow" />
                
                <h2 className="text-stone-500 text-sm tracking-widest uppercase mb-2">El destino ha elegido a</h2>
                <div className="text-4xl md:text-5xl font-black text-white mb-8 glitch-text">
                  {winner.name}
                </div>

                <div className="border-t-2 border-dashed border-stone-800 my-6"></div>

                <h3 className="text-stone-500 text-sm tracking-widest uppercase mb-2">Recibe el objeto</h3>
                <div className="text-2xl text-lime-400 font-bold mb-2">
                  {winner.prize.name}
                </div>
                <p className="text-rose-400 text-sm italic bg-rose-900/20 p-2 inline-block">
                  Consecuencia: {winner.prize.curse}
                </p>

                <div className="mt-8">
                  <SurrealButton onClick={() => setWinner(null)} variant="danger">
                    Aceptar Destino
                  </SurrealButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decoración de fondo */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20 flex items-center justify-center overflow-hidden">
             <div className="w-[800px] h-[800px] border border-stone-800 rounded-full animate-[spin_60s_linear_infinite]"></div>
             <div className="absolute w-[600px] h-[600px] border border-stone-800 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
             <div className="absolute w-[400px] h-[400px] border border-stone-800 rounded-full animate-[spin_20s_linear_infinite]"></div>
        </div>

      </div>
    </div>
  );
}

export default App;