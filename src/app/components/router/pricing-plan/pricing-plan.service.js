/**
 * Created by Axel on 28/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('PricingPlan', PricingPlan);

    PricingPlan.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  PricingPlan($resource, $q, ToastrService, API_BASE_URL) {

        var resourceUrl = API_BASE_URL+'/api/pricing-plans/:id';

        var resource = $resource(resourceUrl, {}, {
            'update': {method: 'PATCH'}
        });

        /////////////////////////////////////////////

        var service = {
            getAll: getAll,
            save: save,
            get: get,
            delete: remove,
            update: update,
            init: init
        };

        return service;

        ////////////////////////////////////////////

        function getAll(context) {
            return resource.get({
                'context': angular.toJson(context)
            })
                .$promise
                .then(getPricingPlansThen)
                .catch(getPricingPlansCatch);

            function getPricingPlansThen(data) {
                return data.pricing_plans;
            }

            function getPricingPlansCatch(error) {
                ToastrService.error('Impossible to retrieve PricingPlans','XHR Error');
                return $q.reject(error);
            }
        }

        function get(id, context) {
            return resource.get({'id': id, 'context': angular.toJson(context)})
                .$promise
                .then(getPricingPlanThen)
                .catch(getPricingPlanCatch);

            function getPricingPlanThen(data){
                delete data.$promise;
                delete data.$resolved;

                return data
            }
            function getPricingPlanCatch(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function save(pricingPlan){
            return resource.save(toPayloadFormat(pricingPlan))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function update(pricingPlan){
            return resource.update({'id': pricingPlan.id}, toPayloadFormat(pricingPlan))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function remove(pricingPlanId){
            return resource.delete({'id': pricingPlanId})
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function init() {
            return {
                name: null,
                comment: null,
                id_tranche: null,
                id_router: null
            }
        }

        function toPayloadFormat(pricingPlan){
            var tmp = Object.assign({}, pricingPlan);

            delete tmp.id;
            delete tmp.list_databases;

            tmp.id_router = tmp.id_router.id;

            var trancheIds = [];
            for (var i = 0; i < tmp.id_tranche.length ; i++){
                trancheIds.push({'id': tmp.id_tranche[i].id});
            }

            tmp.id_tranche = trancheIds;

            return tmp;
        }
    }

})();
