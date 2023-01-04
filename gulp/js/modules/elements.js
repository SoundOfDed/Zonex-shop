// Swiper-header
const bannerSlider = new Swiper('.banner-slider', {   
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    }
    )

    // Marketing
    const marketing = document.querySelector('.marketing')


    if (marketing) {
    
    let counter = 0;
    let delay = 5000;
    
    const data = [
        {
            title: 'Title of product 1',
            where: 'Moscow, Russia'
        },
        {
            title: 'Title of product 2',
            where: 'Kiev, Ukraine'
        },
        {
            title: 'Title of product 3',
            where: 'Rome, Italy'
        },
    ]
    
    const closeMarketing = () => {
        marketing.classList.remove('marketing--visible');
    }
    
    function changeMarketingData(){
        marketing.classList.remove('marketing--visible');
    
        setTimeout(() => {
            marketing.classList.add('marketing--visible');
            const stringTitle = `${data[counter].title}`;
            const stringWhere = `15 minutes ago ${data[counter].where}`;
        
            marketing.querySelector('.marketing__title').textContent = stringTitle;
            marketing.querySelector('.marketing__when-from').textContent = stringWhere;
        
            counter++;
        
            if (counter === data.length){
                counter = 0;
            }
        }, delay - 2000)
    
        
    }
    
    changeMarketingData();
    
    setInterval(changeMarketingData, delay)
    
    marketing.addEventListener('click', (e) => {
        if (e.target.classList.contains('marketing__close')) {
            closeMarketing();
        }
    })
    }
    
    