$(function () {

    const renderList = function () {
        $('.content').empty();

        $.ajax({ url: "/api/lists", method: "GET" })
            //require data from listdata.js and get list object
            .then(function (dataList) {

                //set this variable to be element class lists
                let contentHtml = $('.lists');
                dataList.forEach(e => {
                    //in class lists. add this element
                    contentHtml.append(
                        //in class lists, create div class list
                        $(`<div>`)
                            //in div class list, add the following elements
                            .attr('data-id', `${e.list}`)
                            .attr(`data-idd`, `${e._id}`)
                            .addClass('list')
                            .append(
                                //add header with data.list
                                $('<header>')
                                    .text(e.list),
                                // create unordered list for the card element
                                $('<ul>')
                                    .addClass(`${e.list}`)
                                    .addClass(`containers`),
                                // create a footer add a card /button
                                $('<footer>')
                                    .text('Add a card...')
                                    .attr('id', 'clickAddCard'),
                        )
                    )
                    
                    $.ajax({ url: `/api/lists/${e._id}`, method: 'GET' })
                        .then(function (dataList) {
                            // console.log(dataList);
                            let cardList = $(`.${e.list}`).addClass('listOfCards')
                            dataList[0].cards.forEach(eachCard =>
                                cardList.append(
                                    $('<li>')
                                        .text(eachCard.card)
                                        .attr('draggable', 'true')
                                        .attr('data-cardId',`${eachCard._id}`)
                                        .addClass('dragCard')
                            )
                        )
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
                    )
                )

                $(`.lists`).append(contentHtml);
                
            })
            }

            $(document).on('click','.clickAddCard',function(){
                


                let newdata = {
                        card: $('inputCard').val()
                    }
                    console.log(newdata);
                $.ajax({ url: '/api/lists', method: "GET" })
                .then(function (listData) {
                    
                    // console.log(newdata)
                    listData.forEach(e =>
                        $.ajax({ url: `/api/lists/${e._id}`, method: "POST", data: newdata })
                        .then(function(){
                            $('.listofCards').empty();
                            renderList();
                        })
                    )})
                })

                function drag(){
                    const fills = document.querySelectorAll('.dragCard');
                    // console.log(fills);
                    const containers = document.querySelectorAll('.containers');

                    // console.log(containers);

                    
            
                    for(const fill of fills){
                        fill.addEventListener('dragstart',dragStart);
                        fill.addEventListener('dragend', dragEnd);  
                    }
            
                    for(const container of containers){
                        container.addEventListener('dragover',dragOver);
                        container.addEventListener('dragenter',dragEnter);
                        container.addEventListener('dragleave',dragLeave);
                        container.addEventListener('drop',dragDrop);
                    }

                    let id;
                   
            
                    function dragStart(){
                        id = $(this).attr("data-cardId");
                    }
            
                    function dragEnd(){
                
                    }
            
                    

                    function dragOver(ev){
                        ev.preventDefault();
                       
                    }
                    function dragEnter(ev){
                        ev.preventDefault();
                        
                    }
                    function dragLeave(){
                        
                    }
                    function dragDrop(){

                        const moveList = $(this).attr('data-idd');
                        const movedCard = id;
                        console.log(movedCard);
                        console.log(moveList);
                        // console.log(movedCard);
                        // console.log(this);
                        let newData = {
                            card : movedCard
                        }
                        // $.ajax({url:`/api/lists/${moveList}`, method:'POST', data: newData})
                        // $.ajax({url:'/api/cards',method:'DELETE', data:newData})
                        // .then(function(){
                            
                        // })
                    }
                    
                }        

                function drop(){
                    
                }
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