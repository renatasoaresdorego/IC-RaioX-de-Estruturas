// Obtém o contexto 2D do canvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Função para calcular pixels por metro (ppm)
function calcularPixelsPorMetro(dimImgX, dimImgY, dimProjX, dimProjY) {
    let ppmL = dimImgX / dimProjX;
    let ppmH = dimImgY / dimProjY;
    return (ppmL + ppmH) / 2;
}

// Função para transformar dimensões em pixels
function transformarParaPixels(dimensao, ppm) {
    return dimensao * ppm;
}

// Função para obter o código RGB correspondente ao nome da cor
function obterCorRGB(nomeCor) {
    // Objeto com cores pré-definidas
    var coresPredefinidas = {
        "fissura": "0, 255, 0",    // verde
        "som cavo": "255, 165, 0", // laranja
        "mancha": "255, 192, 203"  // rosa
    };

    // Verifica se o nome da cor está no objeto de cores pré-definidas
    if (nomeCor.toLowerCase() in coresPredefinidas) {
        return coresPredefinidas[nomeCor.toLowerCase()];
    } else {
        // Se a cor não estiver predefinida, retorna null
        return null;
    }
}

// Função para desenhar retângulo com base nas informações do projeto e na cor especificada
function desenharRetangulo(cor, projeto) {
    // Calcula ppm
    let ppm = calcularPixelsPorMetro(projeto.imgX, projeto.imgY, projeto.projetoX, projeto.projetoY);

    // Calcula dimensões da patologia em pixels
    let larguraPx = transformarParaPixels(projeto.largura, ppm);
    let alturaPx = transformarParaPixels(projeto.altura, ppm);

    // Calcula ponto central da patologia em pixels
    let pontoCentralX = transformarParaPixels(projeto.pontoCentral.x, ppm);
    let pontoCentralY = transformarParaPixels(projeto.pontoCentral.y, ppm);

    // Calcula coordenadas do retângulo
    let xCanva = pontoCentralX - larguraPx / 2;
    let yCanva = pontoCentralY - alturaPx / 2;

    // Desenha o retângulo com a cor especificada
    ctx.beginPath();
    ctx.rect(xCanva, yCanva, larguraPx, alturaPx);
    ctx.fillStyle = 'rgba(' + cor + ', 0.5)';
    ctx.fill();
    ctx.closePath();
}

// Objeto para armazenar informações de dimensões
var projetoDimensoes = {
    projetoX: parseFloat(prompt("Digite a largura total do projeto em metros: ")),
    projetoY: parseFloat(prompt("Digite a altura total do projeto em metros: ")),
    imgX: parseFloat(prompt("Digite a resolução em pixels da imagem em x: ")),
    imgY: parseFloat(prompt("Digite a resolução em pixels da imagem em y: "))
};

// Loop para desenhar múltiplos retângulos
var continuar = true;
while (continuar) {
    var nomePatologia = prompt("Digite o nome da patologia [fissura, som cavo, mancha] ou 'parar' para encerrar: ");
    if (nomePatologia.toLowerCase() === 'parar') {
        continuar = false;
    } else {
        // Variáveis para armazenar as dimensões da patologia
        var larguraPatologia = parseFloat(prompt("Largura em metros da área da patologia: "));
        var alturaPatologia = parseFloat(prompt("Altura em metros da área da patologia: "));
        var pontoCentralXPatologia = parseFloat(prompt("Digite a coordenada x em metros referente ao ponto central da patologia: "));
        var pontoCentralYPatologia = parseFloat(prompt("Digite a coordenada y em metros referente ao ponto central da patologia: "));

        // Objeto contendo as dimensões da patologia
        var projetoPatologia = {
            largura: larguraPatologia,
            altura: alturaPatologia,
            pontoCentral: {
                x: pontoCentralXPatologia,
                y: pontoCentralYPatologia
            },
            imgX: projetoDimensoes.imgX,
            imgY: projetoDimensoes.imgY,
            projetoX: projetoDimensoes.projetoX,
            projetoY: projetoDimensoes.projetoY
        };

        // Obtém o código RGB correspondente ao nome da patologia
        var corRGB = obterCorRGB(nomePatologia);
        if (corRGB !== null) {
            // Se a cor estiver predefinida, desenha o retângulo com a cor obtida
            desenharRetangulo(corRGB, projetoPatologia);
        } else {
            // Se a cor não estiver predefinida, pede ao usuário que insira manualmente a cor RGB
            corRGB = prompt("A patologia '" + nomePatologia + "' não está predefinida. Por favor, insira um nome válido (por exemplo, fissura): ");
            // Desenha o retângulo com a cor obtida
            desenharRetangulo(corRGB, projetoPatologia);
        }
    }
}
