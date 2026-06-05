import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ChevronRight, Award } from 'lucide-react';

export default function DashboardStudent() {
  const subjects = [
    { id: 1, name: 'Advanced Mathematics', time: '08:00 AM', teacher: 'Dr. Smith', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/30' },
    { id: 2, name: 'Quantum Physics', time: '10:30 AM', teacher: 'Prof. Johnson', color: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/30' },
    { id: 3, name: 'Cyber Security', time: '01:00 PM', teacher: 'Mr. Davis', color: 'from-green-500/20 to-green-600/5', border: 'border-green-500/30' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-400">You have 3 classes scheduled for today.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 glass-panel px-4 py-2 rounded-full">
          <Calendar size={16} className="text-blue-400" />
          <span className="text-sm text-gray-300">Today, Oct 24</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
              <BookOpen className="text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">12</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-200">Enrolled Courses</h3>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
              <Award className="text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-white">3.8</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-200">Current GPA</h3>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/30 transition-all" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
              <Clock className="text-green-400" />
            </div>
            <span className="text-2xl font-bold text-white">92%</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-200">Attendance</h3>
        </motion.div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Today's Schedule</h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {subjects.map((subject) => (
            <motion.div 
              key={subject.id}
              variants={item}
              whileHover={{ scale: 1.01, x: 5 }}
              className={`glass-panel p-5 rounded-2xl border-l-4 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all ${subject.border}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex flex-col items-center justify-center border ${subject.border}`}>
                  <span className="text-xs font-bold text-gray-300">{subject.time.split(' ')[0]}</span>
                  <span className="text-[10px] text-gray-400">{subject.time.split(' ')[1]}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{subject.name}</h4>
                  <p className="text-sm text-gray-400">{subject.teacher}</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight size={20} className="text-gray-300" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
