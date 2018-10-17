$(function () {

    const renderList = function () {
        $('.content').empty();

        $.ajax({ url: "/api/lists", method: "GET" })
            .then(function (dataList) {
                let contentHtml = $('.lists');
                dataList.forEach(e => {
                    contentHtml.append(
                        $(`<div>`)
                            .attr('data-id', `${e.list}`)

                            .addClass('list')
                            .append(
                                $('<header>')
                                    .text(e.list),
                                $('<ul>')
                                    .addClass(`${e.list}`)
                                    .addClass(`containers`)
                                    .attr(`data-idd`, `${e._id}`),
                                $('<footer>')
                                    .text('Add a card...')
                                    .attr('id', 'clickAddCard'),
                            )
                    )

                    $.ajax({ url: `/api/lists/${e._id}`, method: 'GET' })
                        .then(function (dataList) {
                            let cardList = $(`.${e.list}`).addClass('listOfCards')
                            dataList[0].cards.forEach(eachCard =>
                                cardList.append(
                                    $('<li>')
                                        .text(eachCard.card)
                                        .attr('draggable', 'true')
                                        .attr('data-cardName', `${eachCard.card}`)
                                        .attr('data-cardId', `${eachCard._id}`)
                                        .addClass('dragCard')
                                )
                            )
                        })
                        .done(function () {
                            drag();
                        })
                })
                contentHtml.append(
                    $('<div>').addClass('add').append(

                        $('<header>')
                            .text('Make a new list!'),
                        $('<form>').append(
                            $('<input>')
                                .addClass('inputList')
                                .attr('type', "text")
                                .attr('placeholder', "enter list title"),
                            $('<button>')
                                .attr('id', 'addList')
                                .text('Add a List')
                        )
                    ),
                )
                $(`.lists`).append(contentHtml);
            })
    }


    function drag() {
        const fills = document.querySelectorAll('.dragCard');
        const containers = document.querySelectorAll('.containers');
        let cardId;
        let firstBox;
        let moveList;
        for (const fill of fills) {
            fill.addEventListener('dragstart', dragStart);
            fill.addEventListener('dragend', dragEnd);
        }
        for (const container of containers) {
            container.addEventListener('dragover', dragOver);
            container.addEventListener('dragenter', dragEnter);
            container.addEventListener('dragleave', dragLeave);
            container.addEventListener('drop', dragDrop);
        }
        function dragStart() {
            cardId = $(this).attr("data-cardId");
            firstBox = $(this).parent().attr("data-Idd");
        }
        function dragEnd() {
        }
        function dragOver(ev) {
            ev.preventDefault();
        }
        function dragEnter(ev) {
            ev.preventDefault();
        }
        function dragLeave() {
        }
        function dragDrop() {
            moveList = $(this).attr("data-idd");
        }

        function drop() {
            let newData = {
                card: cardId
            }
            $.ajax({ url: `/api/lists/${moveList}`, method: 'POST', data: newData })
            $.ajax({ url: `/api/lists/${firstBox}`, method: 'DELETE', data: newData })
        }
    }
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

    
    renderList();




});








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