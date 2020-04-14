import api from './api'
import Qs from 'qs'

/**
 * VDatatables fetch rows
 * @param {String} url 
 * @param {Array} headers 
 * @param {Object} options 
 * @param {String} searchText 
 */
export const dtFetchRows = function(url, headers, options, searchText) {
    // define columns
    let columns = []
    headers.forEach(header => {
        columns.push({
            data: header.value,
            name: '',
            searchable: header.filterable ? header.filterable : true,
            orderable: header.sortable ? header.sortable : true,
            search: {
                value: '',
                regex: false,
            }
        })
    })

    // define ordering
    let orders = []
    options.sortBy.forEach((sortBy, index)=> {
        const columnIndex = _.findIndex(columns, {data: sortBy})
        orders.push({
            column: columnIndex,
            dir: options.sortDesc[index] ? 'desc' : 'asc'
        });
    });

    // define search
    let search = {
        value: searchText,
        regex: false,
    }

    // degine pagination
    let start = options.page > 1 ? options.itemsPerPage * (options.page - 1) : 0
    let length = options.itemsPerPage;

    return new Promise((resolve, reject) => {
		api().get(url, {
			params: {
                columns: columns,
                order: orders,
                start: start,
                length: length,
                search: search
            },
            paramsSerializer: function (params) {
                return Qs.stringify(params)
            },
		}).then(response => {
			resolve({
				items: Object.freeze(response.data.data),
				total: response.data.recordsTotal ? response.data.recordsTotal : 0,
			});
		}).catch(error => {
			reject(error)
		})
    });
}