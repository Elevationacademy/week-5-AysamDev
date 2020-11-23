const wordPromise = $.get('/randomWord')

wordPromise.then(function(word)
{
    const bookPromise = $.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${word}`)
    let api_key = `jrytziV62gYO1X5Zps15G5Ub4ULASALM`
    const gifPromise = $.get(`http://api.giphy.com/v1/gifs/search?q=${word}&api_key=${api_key}&limit=5`)
    Promise.all([bookPromise,gifPromise])
    .then(function(results)
    {
        let bookTitle = `the book title is:
         ${results[0].items[0].volumeInfo.title}`
        let gifLink = results[1].data[0].embed_url
        $(`#book-title`).text(bookTitle)
        $(`#gif`).attr('src',gifLink)
        
    })
}).catch(function(err)
{
    console.log(err)
})