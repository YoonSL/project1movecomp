$(function () {

    const renderList = function () {

        $('.lists').empty();
        $.ajax({ url: "/api/lists", method: "GET" })
            .then(function (dataList) {
                let contentHtml = $('.lists');
                dataList.forEach(e => {
                    contentHtml.append(
                        $(`<div>`)
                            .attr('data-id', `${e._id}`)
                            .addClass(`list`).append(
                                $('<header>')
                                    .text(e.list).append(
                                        $('<i>')
                                            .addClass('far fa-window-close')
                                            .attr('data-id', `${e._id}`)
                                            .addClass('delete-btn'),
                                ),
                                $('<ul>')
                                    .addClass(`${e.list}`)
                                    .addClass('locateCard')
                                    .addClass('containers')
                                    .attr('data-idd', `${e._id}`),
                                // create a footer add a card /button
                                $('<footer>')
                                    .text('Add a card...')
                                    .addClass('clickAddList')
                                    .attr('data-addCardId',`${e._id}`),

                        )
                        
                    )
                    renderCard(`${e._id}`,`${e.list}`);
                    
                    //this is the add a card button event
                    $('.clickAddList').on('click', function () {
                        $(".clickAddList").off("click")
                        $(this)
                            .text('')
                            .append(
                                $('<input>')
                                    .addClass('addCard')
                                    .attr('placeholder','name of the card')
                                    .attr('type',"text"),
                                $('<button>')
                                    .addClass('addCardButton')
                                    .text('Click to add card')
                            )
                        })
                    $(`.lists`).append(contentHtml);
                    
                })
                contentHtml.append(
                    $('<div>').addClass('add').append(
                        $('<form>').append(
                            $('<input>')
                                .addClass('list-input')
                                .attr('type', "text")
                                .attr('placeholder', "enter list title"),
                            $('<button>')
                                .addClass('add-btn')
                                .text('Add List')
                        )
                    ),
                )
            })
        }

const addList = function () {
    let newData = {
        list: $('.list-input').val().trim()
    }
    $.ajax({
        url: '/api/lists',
        method: 'POST',
        data: newData
    })
        .then(function () {
            renderList();
        })
}

$(document).on('click', '.delete-btn', function () {
    const deletedID = $(this).data('id');

    const deleteID = {
        _id : deletedID
    }
    $.ajax({
        url: `/api/lists`,
        method: "DELETE",
        data: deleteID
    })
    .then(function () {
        renderList();
    })
});
        
function renderCard(listId,className){
    $.ajax({ url: `/api/lists/${listId}`, method: 'GET' })
        .then(function (dataList) {
            let cardList = $(`.${className}`).addClass('listOfCards')
            cardList.empty();
            dataList[0].cards.forEach(eachCard =>
                cardList.append(
                    $('<li>')
                        .text(eachCard.card)
                        .attr('draggable', 'true')
                        .attr('data-cardId', `${eachCard._id}`)
                        .attr('data-cardName', `${eachCard.card}`)
                        .addClass('dragCard')
                        .addClass(`${eachCard.card}`)
                        .append(
                            $('<div>')
                                .addClass('cardEdit')
                                .addClass('fas fa-pen')
                                .attr('data-id', `${eachCard._id}`)
                                .attr('data-name', `${eachCard.card}`),
                            
                            $('<div>')
                                .addClass('cardDelete')
                                .addClass('fas fa-trash-alt')
                                .attr('data-id', `${eachCard._id}`)
                        )
                )
                
            )

            
        })
    }

$(document).on('click','.cardEdit',function(){
    $(document).bind('cardEdit',function(){
        $(document).off('click','.cardEdit');
    });
    const list = $(this).parent();
    const fromList = $(this).attr('data-id');
    list.append(
        $('<input>')
            .attr('placeholder', "enter list title")
            .addClass('cardEditInput'),
        $('<button>')
            .addClass('cardEditButton')
            .text('Click to Edit')
    )

    $(document).on('click','.cardEditButton',function(){
        
        const newCard = $('.cardEditInput').val().trim()

        console.log(newCard);

        const newData = {
        _id : fromList,
        card : newCard 
        }

        $.ajax({ url: `/api/cards`, method: 'PUT', data: newData })
        .then(function(){
    
            renderList();
        })

        
    })
    
})



$(document).on('click','.cardDelete',function(){
    const whichCard = $(this).attr('data-id');
    const fromList = $(this).parent().parent().parent().attr('data-id');

    const newData = {
        _id : whichCard
    }
    $.ajax({ url: `/api/lists/${fromList}`, method: 'DELETE', data: newData })
    .then(function(){
        renderList();
    })
})
$(document).on('click','.addCardButton',function(){
    let newData = {
        card: $('.addCard').val().trim()
    }
    let whichList = $(this).parent().attr(`data-addCardId`);
    $.ajax({ url: `/api/lists/${whichList}`, method: 'POST', data:newData })
    .then(function(){
        renderList();
    })
});


function dragNDrop(){
    let cardId;
    let firstBox;
    let moveList;

    $(document).on('click','.add-btn', addList);

    $(document).on('dragstart',`.dragCard`,function() { 
        cardId = $(this).attr("data-cardName")
        firstBox = $(this).parent().attr("data-Idd")
    })

    $(document).on('dragend',`.dragCard`,function() { 
        let newData = {
            card: cardId
        }
        $.ajax({ url: `/api/lists/${moveList}`, method: 'POST', data: newData })
        $.ajax({ url: `/api/lists/${firstBox}`, method: 'DELETE', data: newData })
        $('.lists').empty();
        renderList();
    })

    $(document).on('dragover',`.containers`,function(ev) { 
        ev.preventDefault();
    })

    $(document).on('dragenter',`.containers`,function(ev) { 
        ev.preventDefault();
    })

    $(document).on('drop',`.containers`,function() { 
        moveList = $(this).attr("data-idd");
    })
}
    dragNDrop();
    renderList();
});




 // function drag() {
                    // const fills = document.querySelectorAll('.dragCard');
                    // const containers = document.querySelectorAll('.containers');
                    
                    // for (const fill of fills) {
                    //     console.log();
                    //     fill.addEventListener('dragstart', dragStart);
                    //     fill.addEventListener('dragend', dragEnd);
                    // }
                    // for (const container of containers) {
                    //     container.addEventListener('dragover', dragOver);
                    //     container.addEventListener('dragenter', dragEnter);
                    //     container.addEventListener('dragleave', dragLeave);
                    //     container.addEventListener('drop', dragDrop);
                    // }
                    
                    // function dragStart() {
                    //     cardId = $(this).attr("data-cardName");
                    //     firstBox = $(this).parent().attr("data-Idd");
                    // }
                    // function dragEnd() {
                    //     let newData = {
                    //         card: cardId
                    //     }
                    //     $.ajax({ url: `/api/lists/${moveList}`, method: 'POST', data: newData })
                    //     $.ajax({ url: `/api/lists/${firstBox}`, method: 'DELETE', data: newData })
                    //     $('.lists').empty();
                    //     renderList();
                    // }
                    // function dragOver(ev) {
                    //     ev.preventDefault();
                    // }
                    // function dragEnter(ev) {
                    //     ev.preventDefault();
                    // }
                    // function dragLeave() {
                    // }
                    // function dragDrop() {
                    //     moveList = $(this).attr("data-idd");
                    // }   
                // }






// $(document).on('click','.clickAddCard',function(){



    //     let newdata = {
    //             card: $('inputCard').val()
    //         }
    //         console.log(newdata);
    //     $.ajax({ url: '/api/lists', method: "GET" })
    //     .then(function (listData) {

    //         // console.log(newdata)
    //         listData.forEach(e =>
    //             $.ajax({ url: `/api/lists/${e._id}`, method: "POST", data: newdata })
    //             .then(function(){
    //                 $('.listofCards').empty();
    //                 renderList();
    //             })
    //         )})
    //     })


    // $("html").on("dragover", function (event) {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     $(this).addClass('dragging');
    // });

    // $("html").on("dragleave", function (event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     $(this).removeClass('dragging');
    // });

    // $("html").on("drop", function (event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     event.target.appendChild(document.getElementById(data));
    //     alert("Dropped!");
    // });

    // $(document).on('allowDrop','.list', function(ev){
    //     ev.preventDefault();
    // })
    // $(document).on('dragover','#dragCard', function(ev){
    //     ev.dataTransfer.setData("text", ev.target.id);
    // })
    // $(document).on('drop','.list', function(ev){
    //     ev.preventDefault();
    //     var data = ev.dataTransfer.getData("text");
    //     ev.target.appendChild(document.getElementById(data));
    // })

    // function allowDrop(ev){
    //     ev.preventDefault();
    // }
    // function drag(ev){
    //     ev.dataTransfer.setData("text", ev.target.id);
    // }
    // function drop(ev){
    //     ev.preventDefault();
    //     var data = ev.dataTransfer.getData("text");
    //     ev.tartget.appendChild(document.getElementById(data));
    // }

//     const list = $('#drag');
//     const containers = $('.list').data('id');
//     console.log(containers);

//     function dragover(e){
//         e.preventDefault()
//     }

//     function dragenter(e){
//         e.preventDefault()
//     }

//     function drop(){
//         this.append(list)
//     }

//     constainers.map(e=>{
//         e.addEventListener("dragover",dragover)
//         e.addEventListener("dragenter",dragenter)
//         e.addEventListener("drop",drop)
//     })
// });

// const inputlist = $('input').val();
// const newdata = {
//     list : inputlist
// }
// $.ajax({url:'/api/lists',method:"POST", data: newdata})
// .then(function(){
//     renderList();
// })
                    // $('<div>').append(
                    //     $(`<ul>`)
                    //         .addClass('contentList')
                    //         .text(`${e.list}`),
                    //     //div where the card should be placed
                    //     $(`<button>`)
                    //         .addClass('addButton')
                    //         .text('click to add cards')
                    // )