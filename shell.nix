{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20
    pkgs.yarn-berry
    pkgs.sqlite
  ];

  shellHook = ''
    echo "Node.js development environment activated!"
    if [ -f package.json ] && [ ! -d node_modules ]; then
      echo "Installing dependencies..."
      yarn install
    fi
  '';
}
