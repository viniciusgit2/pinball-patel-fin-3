// Sistema de Pagamento com Monetizze
// Link de pagamento configurado

// Link de pagamento da Monetizze (todos os valores redirecionam para este link)
const MONETIZZE_LINK = 'https://pay.monetizze.com.br/DMN370615';

// Mantido para compatibilidade - todos usam o mesmo link
const MERCADO_PAGO_LINKS = {
    5: MONETIZZE_LINK,
    10: MONETIZZE_LINK,
    25: MONETIZZE_LINK,
    50: MONETIZZE_LINK,
    100: MONETIZZE_LINK
};

let currentPaymentType = 'donate';
let selectedAmount = 0;

function openPaymentModal(type) {
    currentPaymentType = type;
    const modal = document.getElementById('paymentModal');
    const title = document.getElementById('paymentTitle');
    
    if (type === 'premium') {
        title.textContent = '⭐ Versão Premium - R$ 50,00';
        document.getElementById('paymentOptions').style.display = 'none';
        selectPayment(50);
    } else {
        title.textContent = '💝 Escolha o Valor da Doação';
        document.getElementById('paymentOptions').style.display = 'flex';
    }
    
    modal.classList.add('active');
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.getElementById('payment-form').innerHTML = '';
    selectedAmount = 0;
}

function selectPayment(amount) {
    selectedAmount = amount;
    
    const paymentForm = document.getElementById('payment-form');
    
    // Link da Monetizze sempre configurado
    const isConfigured = true;
    
    if (isConfigured) {
        // Link configurado - mostrar botão de pagamento
        paymentForm.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: #333; margin-bottom: 15px;">
                    💰 ${currentPaymentType === 'premium' ? 'Versão Premium' : 'Apoie o Jogo'}
                </h3>
                <p style="color: #666; margin-bottom: 20px;">
                    Você será redirecionado para completar o pagamento<br>
                    <small>Aceita PIX, Cartão e Boleto</small>
                </p>
                <button 
                    onclick="processarPagamento(${amount})"
                    style="padding: 15px 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; font-weight: bold; width: 100%; transition: transform 0.2s;"
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'">
                    🚀 Continuar para Pagamento
                </button>
                <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 8px;">
                    <div style="display: flex; justify-content: center; gap: 20px; font-size: 14px; color: #555;">
                        <span style="display: flex; align-items: center; gap: 5px;">
                            💳 Cartão
                        </span>
                        <span style="display: flex; align-items: center; gap: 5px;">
                            📱 PIX
                        </span>
                        <span style="display: flex; align-items: center; gap: 5px;">
                            🎫 Boleto
                        </span>
                    </div>
                </div>
                <p style="font-size: 12px; color: #999; margin-top: 15px;">
                    🔒 Pagamento 100% seguro
                </p>
            </div>
        `;
    } else {
        // Link não configurado - mostrar instruções
        paymentForm.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: #333; margin-bottom: 15px;">
                    💰 Valor: R$ ${amount.toFixed(2)}
                </h3>
                <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
                    <p style="color: #856404; font-weight: bold; margin-bottom: 10px;">
                        ⚠️ Sistema de Pagamento ainda não configurado
                    </p>
                    <p style="color: #856404; font-size: 14px; text-align: left; margin-bottom: 10px;">
                        Para começar a receber pagamentos:
                    </p>
                    <ol style="text-align: left; color: #856404; font-size: 14px; margin-left: 20px;">
                        <li>Crie uma conta no Mercado Pago (grátis)</li>
                        <li>Crie links de pagamento no app ou site</li>
                        <li>Cole os links no arquivo <code>web/payment-mp.js</code></li>
                    </ol>
                </div>
                <button 
                    onclick="window.open('https://www.mercadopago.com.br', '_blank')"
                    style="padding: 12px 30px; background: #009EE3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; margin-bottom: 10px; width: 100%;">
                    🚀 Criar Conta no Mercado Pago
                </button>
                <button 
                    onclick="abrirGuia()"
                    style="padding: 12px 30px; background: #f0f0f0; color: #333; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; width: 100%;">
                    📖 Ver Guia Completo
                </button>
            </div>
        `;
    }
}

function processarPagamento(amount) {
    // Salvar informações para a página de sucesso
    localStorage.setItem('paymentType', currentPaymentType);
    localStorage.setItem('paymentAmount', amount);
    
    // Redirecionar para Mercado Pago
    const link = MERCADO_PAGO_LINKS[amount];
    window.location.href = link;
    
    // Analytics (opcional)
    trackPaymentEvent('payment_initiated', amount);
}

function abrirGuia() {
    // Abrir o guia do Mercado Pago
    const guiaUrl = 'https://github.com/SEU_USUARIO/pinball-patel-fin/blob/main/MERCADOPAGO_GUIA.md';
    window.open(guiaUrl, '_blank');
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closePaymentModal();
    }
});

// Tracking de eventos (opcional - para analytics)
function trackPaymentEvent(eventName, amount) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'value': amount,
            'currency': 'BRL',
            'payment_type': currentPaymentType
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
            value: amount,
            currency: 'BRL'
        });
    }
    
    console.log(`[Analytics] ${eventName}: R$ ${amount}`);
}

// Verificar se há retorno de sucesso do Mercado Pago
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const paymentId = urlParams.get('payment_id');
    
    if (status === 'approved' && paymentId) {
        // Pagamento aprovado - redirecionar para página de sucesso
        window.location.href = 'success.html';
    } else if (status === 'pending') {
        // Pagamento pendente (boleto ou PIX não pago ainda)
        alert('⏳ Pagamento pendente! Você receberá uma confirmação quando o pagamento for aprovado.');
    } else if (status === 'rejected') {
        // Pagamento rejeitado
        alert('❌ Pagamento não aprovado. Por favor, tente novamente.');
    }
});
