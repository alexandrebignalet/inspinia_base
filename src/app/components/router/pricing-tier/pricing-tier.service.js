/**
 * Created by Axel on 28/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('PricingTier', PricingTier);

    PricingTier.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  PricingTier($resource, $q, ToastrService, API_BASE_URL) {

        var resourceUrl = API_BASE_URL+'/api/pricing-tiers/:id';

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
                .then(getPricingTiersThen)
                .catch(getPricingTiersCatch);

            function getPricingTiersThen(data) {
                return data.tiers;
            }

            function getPricingTiersCatch(error) {
                ToastrService.error('Impossible to retrieve PricingTiers','XHR Error');
                return $q.reject(error);
            }
        }

        function get(id, context) {
            return resource.get({'id': id, 'context': context})
                .$promise
                .then(getPricingTierThen)
                .catch(getPricingTierCatch);

            function getPricingTierThen(data){
                delete data.$promise;
                delete data.$resolved;

                return data
            }
            function getPricingTierCatch(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function save(pricingTier){
            return resource.save(toPayloadFormat(pricingTier))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function update(pricingTier){
            return resource.update({'id': pricingTier.id}, toPayloadFormat(pricingTier))
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){ return data }
            function onSaveError(error){
                ToastrService.error(error, 'XHR Error');
                return $q.reject(error);
            }
        }

        function remove(pricingTierId){
            return resource.delete({'id': pricingTierId})
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
                minimal_value: null,
                thisCpm: null,
                cpm: null
            }
        }

        function toPayloadFormat(pricingTier){
            var tmp = Object.assign({}, pricingTier);

            delete tmp.id;

            return tmp;
        }
    }

})();
