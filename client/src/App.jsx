import { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Zap, AlertCircle, ChevronRight } from "lucide-react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

function App() {
  const [form, setForm] = useState({
    study_hours: "",
    phone_usage: "",
    sleep: "",
    breaks: "",
    noise: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://productivity-predictor-3-pow5.onrender.com/predict", form);
      setResult(res.data);
    } catch (err) {
      alert("Backend not connected");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-4"
      >
        <header className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 shadow-lg shadow-indigo-500/30"
          >
            <Brain className="text-white w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Productivity AI
          </h2>
          <p className="text-gray-400 text-sm mt-1">Predict your mental focus state</p>
        </header>

        {/* Form Inputs */}
        <div className="space-y-4">
          {Object.keys(form).map((key, index) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <label className="block text-xs font-medium text-indigo-300 uppercase tracking-wider mb-1 ml-1">
                {key.replace("_", " ")}
              </label>
              <input
                type="number"
                name={key}
                onChange={handleChange}
                placeholder="0"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all"
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing...</span>
            </div>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-current" />
              <span>Generate Prediction</span>
            </>
          )}
        </motion.button>

        {/* Animated Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Prediction</p>
                  <h3 className={`text-2xl font-bold ${result.prediction === "Focused" ? "text-emerald-400" : "text-amber-400"}`}>
                    {result.prediction}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Confidence</p>
                  <p className="text-xl font-mono text-white">{result.probability}%</p>
                </div>
              </div>

              {/* Suggestions Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {result.suggestions?.map((s, i) => (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    {s}
                  </motion.span>
                ))}
              </div>

              {/* Minimal Chart */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <Bar
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { display: false },
                      x: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 10 } } }
                    }
                  }}
                  data={{
                    labels: ["Study", "Phone", "Sleep", "Breaks"],
                    datasets: [
                      {
                        label: "Activity",
                        data: [form.study_hours, form.phone_usage, form.sleep, form.breaks],
                        backgroundColor: "rgba(99, 102, 241, 0.5)",
                        borderRadius: 8,
                        hoverBackgroundColor: "#818cf8"
                      },
                    ],
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;