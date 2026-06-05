import { motion } from 'framer-motion';
import { Users, BookOpen, UserCheck, BellRing, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function DashboardAdmin() {
  const stats = [
    { label: 'Total Students', value: '1,248', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
    { label: 'Total Teachers', value: '84', icon: UserCheck, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/50' },
    { label: 'Active Courses', value: '42', icon: BookOpen, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/50' },
    { label: 'Announcements', value: '12', icon: BellRing, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/50' },
  ];

  const students = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', grade: '12th', status: 'Active' },
    { id: 2, name: 'Samantha Smith', email: 'sam@example.com', grade: '11th', status: 'Active' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', grade: '10th', status: 'Inactive' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', grade: '12th', status: 'Active' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Admin Control Center</h1>
          <p className="text-gray-400">Manage users, courses, and system settings.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl transition-colors font-medium shadow-lg shadow-blue-500/30">
          + Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-panel p-6 rounded-2xl flex items-center gap-4 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${stat.bg} ${stat.border} group-hover:scale-110 transition-transform`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden mt-8">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white">Recent Students</h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-white/10">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Grade</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {students.map((student) => (
                <motion.tr 
                  key={student.id}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-200">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{student.email}</td>
                  <td className="px-6 py-4 text-gray-300">{student.grade}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      student.status === 'Active' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
