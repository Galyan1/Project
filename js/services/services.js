const postData = async(url, data) => { //превращаем ассинхронный в синхронный как бы
    const res =await fetch(url, {
     method:"POST",
     headers: {
         'Content-type': 'application/json'
      },
     body: data //данные,которые мы постим
    });
    return await res.json(); //возращаем в json формате
 };

 const getResource = async(url) => { //превращаем ассинхронный в синхронный как бы
    const res =await fetch(url);

    if(!res.ok){ //если ошибка, чтоб сработал блок catch
      throw  new Error(`Coold not fatch ${url}, status: ${res.status}`);

    }
    return await res.json(); //возращаем в json формате
 };

 export {postData, getResource};