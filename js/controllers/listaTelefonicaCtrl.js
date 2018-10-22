app.controller("listaTelefonicaController", ['$scope', '$http', function ($scope, $http) {
  $scope.appTitulo = "Lista Telefonica";
  $scope.contatos = [];
  $scope.operadoras = [];

  const CONTATOS_URL = "http://localhost:3001/api/contatos";
  const OPERADORAS_URL = "http://localhost:3001/api/operadoras";

  var carregarContatos = function () {
    $http({
      method: 'GET',
      url: CONTATOS_URL
    })
    .then(
        function success(res) {
          $scope.contatos = res.data;
        }, function error(err) {
          console.log(err);
        }
      );
  };

  var carregarOperadoras = function () {
    $http({
      method: 'GET',
      url: OPERADORAS_URL
    })
    .then(
        function success(res) {
          $scope.operadoras = res.data;
        }, function error(err) {
          console.log(err);
        }
      );
  };

  $scope.addContato = (contato) => {
    $scope.contatos.push(angular.copy(contato));
    delete $scope.contato;
    $scope.contatoForm.$setPristine();
  };
  $scope.delContatos = contatos => {
    $scope.contatos = $scope.contatos.filter(contato => { if(!contato.selecionado) return contato });
  };
  $scope.isContatoSelecionado = contatos => {
    return contatos.some(contato => contato.selecionado);
  };
  $scope.ordenarPor = campo => {
    $scope.criterioOrdenacao = campo;
    $scope.direcao = !$scope.direcao;
  }
  carregarContatos();
  carregarOperadoras();
}]);