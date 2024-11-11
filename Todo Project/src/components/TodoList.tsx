import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-3"
    >
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className={`group flex items-center justify-between p-4 rounded-xl transition-all ${
              todo.completed
                ? 'bg-teal-50/50 border border-teal-100'
                : 'bg-white/50 border border-slate-100 hover:border-rose-200'
            } backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggle(todo.id)}
                className={`flex-shrink-0 transition-all ${
                  todo.completed ? 'text-teal-500' : 'text-slate-400 hover:text-rose-600'
                }`}
              >
                {todo.completed ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </motion.button>
              <div className="flex-1 min-w-0">
                <span
                  className={`text-lg transition-all block truncate ${
                    todo.completed
                      ? 'text-teal-800 line-through'
                      : 'text-slate-700'
                  }`}
                >
                  {todo.text}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(todo.createdAt).toLocaleDateString()} 
                  {todo.updatedAt && ' • Updated'}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all flex-shrink-0 ml-4"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList;