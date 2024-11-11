import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-slate-50 to-teal-50 transition-all">
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8 mt-12"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-rose-500" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-600">
              Today's Tasks
            </h1>
          </div>
          {completedCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCompleted}
              className="px-4 py-2 text-sm text-rose-600 hover:text-rose-700 flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Clear completed
            </motion.button>
          )}
        </motion.div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          className="mb-8"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all bg-white/50 backdrop-blur-sm"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add
            </motion.button>
          </div>
        </motion.form>

        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-sm text-slate-500"
          >
            {completedCount} of {totalCount} tasks completed
          </motion.div>
        )}

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-slate-500">
              No tasks yet. Add some to get started!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
