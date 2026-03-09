'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, VideoPlayer, Button } from '@repo/ui';

export default function PlayerPage() {
  const [completed, setCompleted] = useState(false);

  const handleProgress = (p: number) => {
    console.log(`Progress: ${p.toFixed(2)}%`);
  };

  const handleComplete = () => {
    setCompleted(true);
    // Call API to save progress
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer
            url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" // Example adaptive stream
            onProgress={handleProgress}
            onComplete={handleComplete}
          />

          <div>
            <h1 className="text-2xl font-bold">Aula 01: Introdução ao Seca Barriga</h1>
            <p className="text-muted-foreground mt-2">
              Nesta aula vamos aprender os fundamentos da respiração e ativação do core para maximizar seus resultados.
            </p>
          </div>

          {completed && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 flex justify-between items-center">
                <p className="text-green-800 font-medium">Parabéns! Você concluiu esta aula. +50 XP 🏆</p>
                <Button>Próxima Aula</Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Módulo 1: Fundamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 border-l-4 border-primary rounded flex justify-between items-center">
                  <span className="text-sm font-medium">1. Introdução</span>
                  <span className="text-xs text-primary font-bold">ASSISTINDO</span>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded cursor-pointer border flex justify-between items-center">
                  <span className="text-sm">2. Ativação de Core</span>
                  <span className="text-xs text-muted-foreground">15 min</span>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded cursor-pointer border flex justify-between items-center opacity-50">
                  <span className="text-sm">3. Circuito de Queima</span>
                  <span className="text-xs text-muted-foreground">Bloqueado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
