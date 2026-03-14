'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

export default function Nutrition() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/nutrition/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setPlan({
        mealPlan: data.content,
        shoppingList: data.shoppingList?.items || []
      });
    } catch (error) {
      console.error('Failed to generate plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Nutrição com IA</h1>

      {!plan ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Gerar seu Plano Alimentar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              Nossa IA criará um plano personalizado baseado no seu perfil (peso, altura, objetivo e orçamento).
            </p>
            <Button className="w-full" onClick={generatePlan} disabled={loading}>
              {loading ? 'Gerando...' : 'Gerar Agora'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Plano Diário</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(plan.mealPlan).map(([meal, desc]: any) => (
                <div key={meal} className="mb-4 border-b pb-2 last:border-0">
                  <h4 className="font-semibold text-primary">{meal}</h4>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Compras Automatizada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {plan.shoppingList.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                    <span>{item.item} ({item.qty})</span>
                    <span className="font-semibold">{item.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <p className="font-bold flex justify-between">
                  <span>Custo Total Estimado:</span>
                  <span>R$ 45,00</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
