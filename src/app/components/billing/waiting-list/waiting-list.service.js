(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('WaitingList', WaitingList);

    WaitingList.$inject = ['$resource','API_BASE_URL', 'ToastrService', '$q', '$http'];

    function WaitingList ($resource, API_BASE_URL, ToastrService, $q, $http) {

        var resourceUrl = API_BASE_URL + '/api/waitinglists/:id';

        var resource = $resource( resourceUrl, {}, {
            save:   { method: 'POST' },
            update: { method: 'PATCH' },
            delete: { method: 'DELETE' },
            send:   { method: 'GET', url: API_BASE_URL + '/api/waitinglists/:id/send' }
        });

        //////////////////////////////

        var service = {
            get: get,
            getAll: getAll,
            save: save,
            update: update,
            init: init,
            send: send,
            pdf: pdf,
            generateDocNumber: generateDocNumber,
            create: create,
            mailPreferences: getMailPreferences
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
                ToastrService.error(error, 'Impossible to get the waiting list.');
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
                ToastrService.error(error, 'Impossible to get all the waiting lists.');
                return $q.reject(error);
            }
        }

        function save(waitingList){
            return resource.save(waitingList)
                .$promise
                .then(onSaveSuccess)
                .catch(onSaveError);

            function onSaveSuccess(data){
                return data;
            }

            function onSaveError(error){
                ToastrService.error(error, 'Impossible to save the waiting list.');
                return $q.reject(error);
            }
        }

        function update(waitingList){
            return resource
                .update({'id': waitingList.id }, toPayloadFormat(waitingList))
                .$promise
                .then(onPatchSuccess)
                .catch(onPatchError);

            function onPatchSuccess(data){
                return data;
            }

            function onPatchError(error){
                ToastrService.error(error, 'Impossible to save the waiting list.');
                return $q.reject(error);
            }
        }

        function init(){
            return {
                docNumber: null,
                referenceDate: null,
                sentByMail: false,
                sender: "get the mail of current user pls",
                company: null,
                emails: [],
                recipients: []
            };
        }

        /**
         * Return the unique number for an waitingList based on the ids of datatool waitingLists objects
         * template of doc number: YYYY_MON_MM_id
         * YYYY: year ; MM: month ; MON: predefined ; id: last waitingList id + 1
         */
        function generateDocNumber() {

            return resource.get({ limit: 1, sort: 'desc' })
                .$promise
                .then(getLastWaitingListIdSuccess)
                .catch(getLastWaitingListIdFailed);


            function getLastWaitingListIdSuccess (result) {
                return result.waiting_lists.length === 0 ? 1 : result.waiting_lists[0].id+1
            }
            function getLastWaitingListIdFailed (error) {
                ToastrService.error('Cannot get last waiting list id from DataEngine.', 'Waiting list request');
                return $q.reject(error);
            }
        }

        function send(id, email, prefs) {
            return resource.send({ id: id, email: email, subject: prefs.subject, message: prefs.message })
                .$promise
                .then(onSendSuccess)
                .catch(onSendError);

            function onSendSuccess(data){
                return data;
            }
            function onSendError(error){
                ToastrService.error(error, 'Impossible to send the waitingList.');
                return $q.reject(error);
            }
        }

        function pdf(id) {
            return $http({
                method: 'GET',
                url: API_BASE_URL + '/api/waitinglists/'+id+'/pdf',
                responseType: 'arraybuffer'
            })
                .then(onPdfSuccess)
                .catch(onPdfError);

            function onPdfSuccess(pdf){
                var file = new Blob([pdf.data], {type: 'application/pdf'});
                return URL.createObjectURL(file);
            }
            function onPdfError(error){
                ToastrService.error(error, 'Impossible to generate the waitingList pdf.');
                return $q.reject(error);
            }
        }

        function create(announcer, sendings, month) {
            var waitingList = init();

            return generateDocNumber()
                .then(function(docNumber){

                    waitingList.docNumber = docNumber;
                    waitingList.referenceDate = month.start;
                    waitingList.company = announcer.company.id;

                    angular
                        .forEach(sendings, function(sending){
                            waitingList.emails.push({ id: sending.id })
                        });

                    return waitingList
                })
                .then(save)
                .then(function(waitingList){
                    ToastrService.success('Waiting list created', 'DataEngine');
                    return waitingList
                })
        }

        function getMailPreferences() {

            return {
                subject: null,
                message: null
            }
        }
    }
})();
