const SequraPaymentsModal = (modalStyle, instalmentTotal) => `
<div style="${modalStyle}">
    <div>
        <p>Fracciona tu pago</p>
        <p>Sequra</p>
    </div>
    <div>
        <ol>
            <li>Eliges "Fracciona tu pago" al realizar el pedido y pagas sólo la primera cuota</li>
            <li>Recibes tu pedido</li>
            <li>El resto de pagos se cargarán automáticamente a tu tarjeta</li>
        </ol>
    </div>
    <p>¡Así de simple!</p>
    <p>Además, en el importe mostrado ya se incluye la cuota única mensual de ${instalmentTotal}/mes, por lo que no tendrás ninguna sorpresa</p>
</div>
`;

export default SequraPaymentsModal;
