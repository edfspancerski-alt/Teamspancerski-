'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

export default function ProfessionalProtocol() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const generateProtocol = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/protocol/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setReport(data.fullReport);
    } catch (error) {
      console.error('Failed to generate protocol:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Protocolo de Elite Team Spancerski</h1>

      {!report ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Gerar Protocolo Profissional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              Nosso motor de IA baseado em ciência do esporte e metodologias de fisiculturismo profissional (Dorian Yates, Pacholok) criará seu plano completo.
            </p>
            <Button className="w-full h-12 text-lg" onClick={generateProtocol} disabled={loading}>
              {loading ? 'Processando Ciência...' : 'Gerar Meu Protocolo'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(report).map(([section, content]: any, index) => (
            <Card key={section} className="overflow-hidden border-l-4 border-primary">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-xl">
                  {index + 1}. {section}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center gap-4 py-8">
            <Button variant="outline" onClick={() => window.print()}>Imprimir Protocolo</Button>
            <Button onClick={() => setReport(null)}>Gerar Novo Ajuste</Button>
          </div>
        </div>
      )}
    </div>
  );
}
