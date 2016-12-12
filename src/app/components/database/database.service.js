(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Database', Database);

    Database.$inject = ['$resource','API_BASE_URL', 'ToastrService', '$q', '$http'];

    function Database ($resource, API_BASE_URL, ToastrService, $q, $http) {

        var resourceUrl = API_BASE_URL + '/api/databases/:id';

        var resource = $resource( resourceUrl, {}, {
            'save': { method:'POST'},
            'patch': { method:'PATCH'},
            'delete':{ method:'DELETE'}
        });

        //////////////////////////////

        var service = {
            get: get,
            getAll: getAll,
            save: save,
            patch: patch,
            init: init,
            lastNCampaigns: lastNCampaigns,
            getLadder: getLadder,
            getIncomesByBm: getIncomesByBm
        };

        return service;

        function get(id, context){
            return resource.get({
                'id':id,
                'context': angular.toJson(context)
            })
                .$promise
                .then(onGetSuccess)
                .catch(onGetError);

            function onGetSuccess(data){
                delete data.$promise;
                delete data.$resolved;

                return data;
            }

            function onGetError(error){
                ToastrService.error(error, 'Impossible to get the database.');
                return $q.reject(error);
            }
        }

        function getAll(context){
            return resource.get({
                'context': angular.toJson(context)
            })
                .$promise
                .then(onGetAllSuccess)
                .catch(onGetAllError);

            function onGetAllSuccess(data){
                return data.databases;
            }

            function onGetAllError(error){
                ToastrService.error(error, 'Impossible to get all the databases.');
                return $q.reject(error);
            }
        }

        function save(database){
            return resource
                .save(formatDatabaseToSave(database))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){
                return data;
            }

            function onSaveError(error){
                ToastrService.error(error, 'Impossible to save the database.');
                return $q.reject(error);
            }
        }

        function patch(database){
            return resource
                .patch({'id': database.id }, formatDatabaseToSave(database))
                .$promise
                .then(onPatchSuccess)
                .catch(onPatchError);

            function onPatchSuccess(data){
                return data;
            }

            function onPatchError(error){
                ToastrService.error(error, 'Impossible to save the database.');
                return $q.reject(error);
            }
        }

        /* ------------------------------- /
        //
        //         DATABASE SHOW          //
        //
        / ------------------------------- */

        function lastNCampaigns(databaseId, numberOfCampaigns) {
            return $http({
                method: 'GET',
                url: API_BASE_URL + './../en/databases/' + databaseId + '/statistics/last-' + numberOfCampaigns
            });
        }


        // TODO : Add the ../en/

        function getLadder(databaseId, groupBy) {
            return $http({
                method: 'GET',
                url: API_BASE_URL + '/databases/' + databaseId +'/statistics/' + groupBy +'/ladder'
            });
        }


        function getIncomesByBm(databaseId) {
            return $http({
                method: 'GET',
                url: API_BASE_URL + '/databases/' + databaseId + '/incomes-by-business-model'
            });
        }

        function init(){
            return {
                    id: null,
                    name: null,
                    country: null,
                    type: null,
                    reinerouge_id: null,
                    expertsender_apiurl: null,
                    expertsender_apikey: null,
                    mailxpertise_token: null,
                    mailxpertise_apikey: null,
                    mailxpertise_list_ids: null,
                    mailxpertise_domain: null,
                    age: false,
                    sexe: false,
                    zipcode: false,
                    name_ext: false,
                    firstname: false,
                    active: false
            };
        }

        function formatDatabaseToSave(database){
            var tmp = Object.assign({}, database);

            delete tmp.routers;
            delete tmp.companies;
            delete tmp.lots;
            delete tmp.expertsender_cpm;
            delete tmp.id;

            return tmp;
        }
    }
})();
