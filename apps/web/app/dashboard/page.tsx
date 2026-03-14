'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const stats = [
    { label: 'Progresso de Treino', value: '75%', color: 'bg-blue-500' },
    { label: 'Treinos Concluídos', value: '12', color: 'bg-green-500' },
    { label: 'Streak de Dias', value: '5 🔥', color: 'bg-orange-500' },
    { label: 'Pontuação XP', value: '1,250', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard do Membro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`h-1 w-full ${stat.color} mt-2 rounded-full`} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Meus Programas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Seca Barriga</h4>
                  <p className="text-sm text-muted-foreground">Dia 12 de 30</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-md">Continuar</button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                <div>
                  <h4 className="font-semibold">Empina Bumbum</h4>
                  <p className="text-sm text-muted-foreground">Aguardando desbloqueio</p>
                </div>
                <button disabled className="bg-gray-300 text-white px-4 py-2 rounded-md">Bloqueado</button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 border-b pb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">João Silva</p>
                  <p className="text-xs text-muted-foreground">Completou o treino de hoje! 🚀</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">Maria Souza</p>
                  <p className="text-xs text-muted-foreground">Nova conquista: 7 dias seguidos!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
