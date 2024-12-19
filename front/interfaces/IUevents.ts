import exp from "constants"

export interface IUEvent {
    id: number,
    photos: [string],
    visualizations: number,
    is_active: boolean,
    creation_date: Date,
    last_actualization_date: Date,
    event_name: string,
    event_description: string,
    event_reference_value: string,
    event_allowed_hours: number,
    event_extra_hour_rate: string,
    event_category: number
}

export interface IUOneEvent {
    event: IUEvent
}

export interface IUMostEventViewed {
    most_viewed: [IUEvent]
}

export interface IUMostEventPopular {
    most_popular: [IUEvent]
}

export interface IUEvents {
    count: number,
    next?: string,
    previous?: string,
    current_page: number,
    page_size: number,
    results: [IUEvent],
}

export interface IUCategory {
    id: number,
    visualizations: number,
    is_active: boolean,
    creation_date: Date,
    last_actualization_date: Date,
    event_category_name: string,
    event_category_description: string,
    event_category_image: string,
    event_category_image_url: string,
}

export interface IUCategorys {
    count: number,
    next?: string,
    previous?: string,
    current_page: number,
    page_size: number,
    results: [IUCategory]
}