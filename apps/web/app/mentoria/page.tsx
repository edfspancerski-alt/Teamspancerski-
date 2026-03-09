'use client';

import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

export default function PremiumMentorship() {
  const benefits = [
    'Acompanhamento pessoal com Coach Carlos',
    'Planos de nutrição avançados e ajustados semanalmente',
    'Suporte prioritário via WhatsApp',
    'Acesso a workshops exclusivos ao vivo',
    'Análise de técnica de exercícios por vídeo',
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Mentoria Premium Team Spancerski</h1>
        <p className="text-xl text-muted-foreground">O caminho mais curto para seus resultados de elite.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1574680096145-d05b474e2155"
            alt="Mentorship"
            className="rounded-2xl shadow-2xl"
          />
        </div>

        <Card className="border-primary border-2">
          <CardHeader>
            <CardTitle className="text-2xl">O que você recebe:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 mb-8">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold">✔</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full text-lg h-12 bg-primary hover:bg-primary/90">
              CANDIDATAR-SE AGORA
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Vagas limitadas para garantir a qualidade do acompanhamento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
