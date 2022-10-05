var cursos = [
    {
        "nome"  :   "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla" :   "DS",
        "icone" :   "https://i.postimg.cc/j57fVJYN/Frame-2.png",
        "carga" :   "1200",
    },
    {
        "nome"  :   "002 - Técnico em Redes de Computadores",
        "sigla" :   "RDS",
        "icone" :   "https://i.postimg.cc/50NBZtNS/Frame-1.png",
        "carga" :   "1200"
    }
];

//todos os cursos
const getCurso = () => {
    let cursinhos = [];

    cursos.forEach(index => {
        cursinhos.push(index);
    })

    return cursinhos;
}

  
//retorna os dados do curso a partir da sigla
const getCursos =  function(siglaCurso){
    let sigla = siglaCurso.toUpperCase();
    const listCurso = {};
    let erro = true;
 

    //tratamento para validacao de sigla vazia e com um unico caractere
    if(typeof(sigla) != 'undefined'){
    if (sigla != '' && sigla.length == 3 || sigla.length == 2){
 
    cursos.forEach(item => {
    if(item.sigla.indexOf(sigla) == 0)
    {
          listCurso.sigla = item.sigla
          listCurso.nome = item.nome
          listCurso.icone = item.icone
          listCurso.carga = item.carga
        
          erro = false;
 
    }
 
 }
    )}
 }
 
        if (erro)
            return false
        else 
            return listCurso;
            
 }
 
 
 module.exports =
 {
     getCursos,
     getCurso
 }