'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

export default function Programs() {
  const programs = [
    {
      id: '1',
      title: 'Seca Barriga',
      description: 'Foco em queima de gordura e definição abdominal.',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      difficulty: 'Médio',
      duration: '30 dias',
    },
    {
      id: '2',
      title: 'Empina Bumbum',
      description: 'Tonificação de glúteos e posterior de coxa.',
      thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c64b52d2',
      difficulty: 'Avançado',
      duration: '45 dias',
    },
    {
      id: '3',
      title: 'Costas em V',
      description: 'Desenvolvimento de largura e definição dorsal.',
      thumbnail: 'https://images.unsplash.com/photo-1605296867304-46dba546535a',
      difficulty: 'Médio',
      duration: '60 dias',
    },
    {
      id: '4',
      title: 'Ombro Cavalo',
      description: 'Foco em deltoides densos e definidos.',
      thumbnail: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3',
      difficulty: 'Avançado',
      duration: '30 dias',
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Programas de Treino</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <Card key={program.id} className="overflow-hidden">
            <img src={program.thumbnail} alt={program.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{program.duration} • {program.difficulty}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{program.description}</p>
              <Button className="w-full">Ver Programa</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
