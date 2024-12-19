export interface IUService {
    id: number,
    photos: string[],
    visualizations: number,
    is_active: boolean,
    creation_date: Date,
    last_actualization_date: Date,
    service_name: string,
    service_description: string,
    service_unitary_cost: number,
    service_creation_date: Date,
    service_category: number
}

export interface IUServices {
    count: number,
    next?: string,
    previous?: string,
    current_page: number,
    page_size: number,
    results: [IUService]
}

export interface IUCategory {
    id: number,
    visualizations: number,
    is_active: boolean,
    creation_date: Date,
    last_actualization_date: Date,
    service_category_name: string,
    service_category_description: string,
    service_category_image: string,
    service_category_image_url: string,
}


export interface IUCategorys {
    count: number,
    next?: string,
    previous?: string,
    current_page: number,
    page_size: number,
    results: [IUCategory]
}

export interface IUMostServicePopular {
    most_popular: [IUService]
}

export interface IUMostServiceViewed {
    most_viewed: [IUService]
}