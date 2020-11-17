let money = 1000
$('.money').text(`Amount Of Money: ${money}`)

const fetchItemPrice = function (input,item) {
    $.ajax(
    {
        type: "get",
        url: `priceCheck/${input}`,
        success: function(itemData)
        {
            console.log(itemData.price)
            if(itemData.price <= money)
            {
                money -= itemData.price
                $('.money').text(`Amount Of Money: ${money}`)
                $('body').append(`<div>Congratulations, you've just bought ${item.name} for ${item.price}. There are ${item.inventory} left now in the store.</div>`)
            }
            else
            {
                $('body').append(`<div>Go Get a job mate</div>`)
            }
        }
        
    })
}

const buyItem = function () {
    let input = $("#buy-input").val()

    $.ajax(
    {
        type: "get",
        url: `buy/${input}`,
        success: function(itemData)
        {
            fetchItemPrice(input,itemData)
            
        }
        
    })

}